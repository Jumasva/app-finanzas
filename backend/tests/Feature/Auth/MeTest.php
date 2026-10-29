<?php

use App\Models\User;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');
});

it('devuelve el usuario de la sesión con los campos del contrato', function () {
    $user = User::factory()->create(['name' => 'Ana Pérez', 'email' => 'ana@correo.com']);

    $this->actingAs($user)
        ->getJson('/api/v1/auth/me')
        ->assertOk()
        ->assertExactJson([
            'data' => [
                'id' => $user->id,
                'name' => 'Ana Pérez',
                'email' => 'ana@correo.com',
                'email_verified_at' => $user->email_verified_at->toIso8601ZuluString(),
                'currency_code' => 'COP',
                'status' => 'active',
                'created_at' => $user->created_at->toIso8601ZuluString(),
            ],
        ]);
});

it('responde 401 cuando no hay sesión', function () {
    $this->getJson('/api/v1/auth/me')
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');
});
