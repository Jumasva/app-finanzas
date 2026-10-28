<?php

use App\Models\User;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');

    $this->user = User::factory()->create(['name' => 'Ana Pérez', 'email' => 'ana@correo.com']);
});

it('actualiza solo el nombre y deja el correo igual', function () {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile', ['name' => 'Ana María Pérez'])
        ->assertOk()
        ->assertJsonPath('data.name', 'Ana María Pérez')
        ->assertJsonPath('data.email', 'ana@correo.com');

    expect($this->user->fresh()->name)->toBe('Ana María Pérez');
});

it('actualiza el correo y lo guarda en minúsculas', function () {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile', ['email' => 'Ana.Perez@Correo.com'])
        ->assertOk()
        ->assertJsonPath('data.email', 'ana.perez@correo.com')
        ->assertJsonPath('data.name', 'Ana Pérez');
});

it('acepta que envíe su mismo correo', function () {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile', ['name' => 'Ana', 'email' => 'ANA@correo.com'])
        ->assertOk();
});

it('responde 422 cuando el correo pertenece a otra cuenta, sin distinguir mayúsculas', function () {
    User::factory()->create(['email' => 'luis@correo.com']);

    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile', ['email' => 'LUIS@correo.com'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'Ya existe una cuenta con este correo.']);

    expect($this->user->fresh()->email)->toBe('ana@correo.com');
});

it('responde 422 cuando un campo enviado no cumple el formato', function (array $data, string $field, string $message) {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile', $data)
        ->assertUnprocessable()
        ->assertJsonValidationErrors([$field => $message]);
})->with([
    'nombre vacío' => [['name' => ''], 'name', 'Escribe tu nombre.'],
    'nombre de más de 100 caracteres' => [['name' => str_repeat('a', 101)], 'name', 'Nombre no puede tener más de 100 caracteres.'],
    'correo sin formato' => [['email' => 'ana-correo.com'], 'email', 'Escribe un correo válido.'],
]);

it('responde 401 cuando no hay sesión', function () {
    $this->patchJson('/api/v1/profile', ['name' => 'Ana'])
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');
});
