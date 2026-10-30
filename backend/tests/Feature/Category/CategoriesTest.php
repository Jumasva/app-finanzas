<?php

use App\Models\Category;
use App\Models\User;
use Database\Seeders\CategorySeeder;
use Illuminate\Support\Facades\DB;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');
    $this->seed(CategorySeeder::class);

    $this->user = User::factory()->create();
});

// Registra un egreso con la categoría, para que quede «en uso» (RN-CAT-005)
function useCategory(Category $category): void
{
    DB::table('financial_movements')->insert([
        'user_id' => $category->user_id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 1000,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
}

describe('GET /categories', function () {
    it('lista las del sistema y las del usuario, primero las del sistema y cada grupo por nombre', function () {
        Category::factory()->for($this->user)->create(['name' => 'Bicicleta', 'kind' => 'expense']);
        Category::factory()->for($this->user)->create(['name' => 'Arte', 'kind' => 'expense']);
        Category::factory()->create(['name' => 'De otra persona', 'kind' => 'expense']);

        $names = $this->actingAs($this->user)
            ->getJson('/api/v1/categories?kind=expense')
            ->assertOk()
            ->json('data.*.name');

        expect($names)->toHaveCount(17)
            ->and(array_slice($names, 0, 2))->toBe(['Alimentación', 'Educación'])
            ->and(array_slice($names, -2))->toBe(['Arte', 'Bicicleta'])
            ->and($names)->not->toContain('De otra persona');
    });

    it('devuelve los campos del recurso Category', function () {
        $this->actingAs($this->user)
            ->getJson('/api/v1/categories?kind=income')
            ->assertOk()
            ->assertJsonPath('data.0', [
                'id' => Category::where('name', 'Arriendos recibidos')->value('id'),
                'name' => 'Arriendos recibidos',
                'kind' => 'income',
                'is_system' => true,
                'is_reserved' => false,
                'is_active' => true,
            ]);
    });

    it('filtra las asignables: activas y no reservadas', function () {
        Category::factory()->for($this->user)->inactive()->create(['name' => 'Inactiva', 'kind' => 'expense']);

        $names = $this->actingAs($this->user)
            ->getJson('/api/v1/categories?kind=expense&assignable=true')
            ->assertOk()
            ->json('data.*.name');

        expect($names)->toHaveCount(13)
            ->not->toContain('Pago de deuda')
            ->not->toContain('Pago de tarjeta')
            ->not->toContain('Inactiva');
    });

    it('filtra por estado', function () {
        Category::factory()->for($this->user)->inactive()->create(['name' => 'Inactiva']);

        $this->actingAs($this->user)
            ->getJson('/api/v1/categories?is_active=false')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Inactiva');
    });

    it('responde 422 con un filtro que no es válido', function () {
        $this->actingAs($this->user)
            ->getJson('/api/v1/categories?kind=otra')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['kind']);
    });

    it('responde 401 cuando no hay sesión', function () {
        $this->getJson('/api/v1/categories')->assertUnauthorized();
    });
});

describe('POST /categories', function () {
    it('crea una categoría personalizada, activa y no reservada', function () {
        $this->actingAs($this->user)
            ->postJson('/api/v1/categories', ['name' => '  Bicicleta  ', 'kind' => 'expense'])
            ->assertCreated()
            ->assertJsonPath('data.name', 'Bicicleta')
            ->assertJsonPath('data.is_system', false)
            ->assertJsonPath('data.is_reserved', false)
            ->assertJsonPath('data.is_active', true);

        expect(Category::where('name', 'Bicicleta')->value('user_id'))->toBe($this->user->id);
    });

    it('responde 422 cuando el nombre ya existe en la clase, sin distinguir mayúsculas ni tildes', function (string $name) {
        Category::factory()->for($this->user)->create(['name' => 'Bicicleta', 'kind' => 'expense']);

        $this->actingAs($this->user)
            ->postJson('/api/v1/categories', ['name' => $name, 'kind' => 'expense'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name' => 'Ya existe una categoría con ese nombre en esta clase.']);
    })->with([
        'igual a una del sistema, sin tilde' => ['alimentacion'],
        'igual a una propia, en mayúsculas' => ['BICICLETA'],
    ]);

    it('acepta el mismo nombre en otra clase o el de otro usuario', function () {
        Category::factory()->create(['name' => 'Bicicleta', 'kind' => 'expense']);

        $this->actingAs($this->user)
            ->postJson('/api/v1/categories', ['name' => 'Bicicleta', 'kind' => 'expense'])
            ->assertCreated();

        $this->postJson('/api/v1/categories', ['name' => 'Alimentación', 'kind' => 'income'])
            ->assertCreated();
    });

    it('responde 422 cuando faltan los datos o no cumplen el formato', function (array $data, array $errors) {
        $this->actingAs($this->user)
            ->postJson('/api/v1/categories', $data)
            ->assertUnprocessable()
            ->assertJsonValidationErrors($errors);
    })->with([
        'sin datos' => [[], ['name' => 'Escribe el nombre de la categoría.', 'kind' => 'Elige la clase de la categoría.']],
        'nombre de más de 50 caracteres' => [['name' => str_repeat('a', 51), 'kind' => 'expense'], ['name' => 'Nombre no puede tener más de 50 caracteres.']],
        'clase que no existe' => [['name' => 'Bicicleta', 'kind' => 'otra'], ['kind' => 'Elige una clase de la lista.']],
    ]);
});

describe('PATCH /categories/{id}', function () {
    it('cambia el nombre y la clase', function () {
        $category = Category::factory()->for($this->user)->create(['name' => 'Bicicleta', 'kind' => 'expense']);

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}", ['name' => 'Venta de bicicletas', 'kind' => 'income'])
            ->assertOk()
            ->assertJsonPath('data.name', 'Venta de bicicletas')
            ->assertJsonPath('data.kind', 'income');
    });

    it('acepta enviar su mismo nombre', function () {
        $category = Category::factory()->for($this->user)->create(['name' => 'Bicicleta']);

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}", ['name' => 'bicicleta'])
            ->assertOk();
    });

    it('responde 422 cuando, al cambiar solo la clase, el nombre ya existe en la clase nueva', function () {
        $category = Category::factory()->for($this->user)->create(['name' => 'Salario', 'kind' => 'expense']);

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}", ['kind' => 'income'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['kind' => 'Ya existe una categoría con ese nombre en esta clase.']);
    });

    it('responde 409 category_in_use al cambiar la clase de una categoría con registros', function () {
        $category = Category::factory()->for($this->user)->create(['kind' => 'expense']);
        useCategory($category);

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}", ['kind' => 'income'])
            ->assertConflict()
            ->assertExactJson([
                'message' => 'No puedes cambiar la clase de esta categoría porque ya tiene registros.',
                'code' => 'category_in_use',
            ]);

        expect($category->fresh()->kind)->toBe('expense');
    });

    it('deja cambiar el nombre de una categoría con registros', function () {
        $category = Category::factory()->for($this->user)->create(['name' => 'Bicicleta']);
        useCategory($category);

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}", ['name' => 'Bicicletas'])
            ->assertOk();
    });

    it('responde 409 system_category_read_only con una categoría del sistema', function () {
        $category = Category::where('name', 'Alimentación')->sole();

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}", ['name' => 'Comida'])
            ->assertConflict()
            ->assertJsonPath('code', 'system_category_read_only');
    });

    it('responde 404 con la categoría de otro usuario o una que no existe', function (string $url) {
        $other = Category::factory()->create();

        $this->actingAs($this->user)
            ->patchJson(str_replace('{other}', (string) $other->id, $url), ['name' => 'Mía'])
            ->assertNotFound()
            ->assertJsonPath('code', 'not_found');
    })->with([
        'de otro usuario' => ['/api/v1/categories/{other}'],
        'que no existe' => ['/api/v1/categories/999999'],
        'id que no es un número' => ['/api/v1/categories/abc'],
    ]);
});

describe('PATCH /categories/{id}/deactivate y /activate', function () {
    it('desactiva y vuelve a activar una categoría personalizada', function () {
        $category = Category::factory()->for($this->user)->create();

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}/deactivate")
            ->assertOk()
            ->assertJsonPath('data.is_active', false);

        $this->patchJson("/api/v1/categories/{$category->id}/activate")
            ->assertOk()
            ->assertJsonPath('data.is_active', true);
    });

    it('no es un error desactivar una categoría que ya está inactiva', function () {
        $category = Category::factory()->for($this->user)->inactive()->create();

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}/deactivate")
            ->assertOk()
            ->assertJsonPath('data.is_active', false);
    });

    it('responde 409 con una categoría del sistema', function (string $action) {
        $category = Category::where('name', 'Salud')->sole();

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$category->id}/{$action}")
            ->assertConflict()
            ->assertJsonPath('code', 'system_category_read_only');

        expect($category->fresh()->is_active)->toBeTrue();
    })->with(['deactivate', 'activate']);

    it('responde 404 con la categoría de otro usuario', function () {
        $other = Category::factory()->create();

        $this->actingAs($this->user)
            ->patchJson("/api/v1/categories/{$other->id}/deactivate")
            ->assertNotFound();

        expect($other->fresh()->is_active)->toBeTrue();
    });
});
