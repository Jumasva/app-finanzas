<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Password;

// Las peticiones del frontend llegan con su origen
beforeEach(function () {
    Http::fake(['api.pwnedpasswords.com/*' => Http::response('')]);

    $this->withHeader('Origin', 'http://localhost:3000');

    $this->user = User::factory()->create(['email' => 'ana@correo.com']);
});

function resetData(string $token, array $overrides = []): array
{
    return array_merge([
        'token' => $token,
        'email' => 'ana@correo.com',
        'password' => 'mi clave nueva 2',
        'password_confirmation' => 'mi clave nueva 2',
    ], $overrides);
}

it('pone la contraseña nueva, cierra todas las sesiones y no inicia una nueva', function () {
    DB::table('sessions')->insert([
        'id' => 'otro-dispositivo',
        'user_id' => $this->user->id,
        'payload' => '',
        'last_activity' => now()->getTimestamp(),
    ]);

    $this->postJson('/api/v1/auth/reset-password', resetData(Password::createToken($this->user)))
        ->assertOk()
        ->assertExactJson(['message' => 'Actualizamos tu contraseña. Inicia sesión con la nueva.']);

    expect(Hash::check('mi clave nueva 2', $this->user->fresh()->password))->toBeTrue();
    $this->assertDatabaseMissing('sessions', ['user_id' => $this->user->id]);
    $this->assertGuest('web');
});

it('no deja usar el mismo enlace dos veces', function () {
    $token = Password::createToken($this->user);

    $this->postJson('/api/v1/auth/reset-password', resetData($token))->assertOk();

    $this->postJson('/api/v1/auth/reset-password', resetData($token, [
        'password' => 'otra clave nueva 3',
        'password_confirmation' => 'otra clave nueva 3',
    ]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);
});

it('responde 422 cuando el enlace venció después de 60 minutos', function () {
    $token = Password::createToken($this->user);

    $this->travel(61)->minutes();

    $this->postJson('/api/v1/auth/reset-password', resetData($token))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);
});

it('responde 422 cuando el token no es válido', function () {
    $this->postJson('/api/v1/auth/reset-password', resetData('token-inventado'))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);

    expect(Hash::check('password', $this->user->fresh()->password))->toBeTrue();
});

it('responde 422 cuando la cuenta ya no está activa', function () {
    $token = Password::createToken($this->user);
    $this->user->forceFill(['status' => 'inactive'])->save();

    $this->postJson('/api/v1/auth/reset-password', resetData($token))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);
});

it('responde 422 cuando la contraseña nueva no cumple la política', function () {
    $this->postJson('/api/v1/auth/reset-password', resetData(Password::createToken($this->user), [
        'password' => 'corta 1',
        'password_confirmation' => 'corta 1',
    ]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['password' => 'Contraseña debe tener al menos 10 caracteres.']);
});

it('responde 422 cuando faltan los datos', function () {
    $this->postJson('/api/v1/auth/reset-password', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token', 'email', 'password']);
});
