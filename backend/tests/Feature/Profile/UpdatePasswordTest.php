<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    Http::fake(['api.pwnedpasswords.com/*' => Http::response('')]);

    $this->withHeader('Origin', 'http://localhost:3000');

    $this->user = User::factory()->create(['password' => 'mi clave actual 1']);
});

// Simula una sesión abierta en otro dispositivo, como la guarda Laravel en la tabla sessions
function addSession(string $id, int $userId): void
{
    DB::table('sessions')->insert([
        'id' => $id,
        'user_id' => $userId,
        'payload' => '',
        'last_activity' => now()->getTimestamp(),
    ]);
}

it('cambia la contraseña, cierra las demás sesiones y mantiene la actual', function () {
    $otherUser = User::factory()->create();
    addSession('otro-dispositivo', $this->user->id);
    addSession('sesion-de-otro-usuario', $otherUser->id);

    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile/password', [
            'current_password' => 'mi clave actual 1',
            'password' => 'mi clave nueva 2',
            'password_confirmation' => 'mi clave nueva 2',
        ])
        ->assertOk()
        ->assertExactJson(['message' => 'Actualizamos tu contraseña y cerramos tus sesiones en otros dispositivos.']);

    expect(Hash::check('mi clave nueva 2', $this->user->fresh()->password))->toBeTrue();
    $this->assertDatabaseMissing('sessions', ['id' => 'otro-dispositivo']);
    $this->assertDatabaseHas('sessions', ['id' => 'sesion-de-otro-usuario']);
    $this->assertAuthenticatedAs($this->user);
});

it('responde 422 cuando la contraseña actual es incorrecta', function () {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile/password', [
            'current_password' => 'otra clave 9',
            'password' => 'mi clave nueva 2',
            'password_confirmation' => 'mi clave nueva 2',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['current_password' => 'La contraseña actual no es correcta.']);

    expect(Hash::check('mi clave actual 1', $this->user->fresh()->password))->toBeTrue();
});

it('responde 422 cuando la contraseña nueva es igual a la actual', function () {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile/password', [
            'current_password' => 'mi clave actual 1',
            'password' => 'mi clave actual 1',
            'password_confirmation' => 'mi clave actual 1',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['password' => 'Tu contraseña nueva debe ser distinta de la actual.']);
});

it('responde 422 cuando la contraseña nueva no cumple la política', function () {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile/password', [
            'current_password' => 'mi clave actual 1',
            'password' => 'corta 1',
            'password_confirmation' => 'corta 1',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['password' => 'Contraseña debe tener al menos 10 caracteres.']);
});

it('responde 422 cuando faltan los datos', function () {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile/password', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors([
            'current_password' => 'Escribe tu contraseña actual.',
            'password' => 'Escribe tu contraseña.',
        ]);
});

it('responde 401 cuando no hay sesión', function () {
    $this->patchJson('/api/v1/profile/password', [])
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');
});
