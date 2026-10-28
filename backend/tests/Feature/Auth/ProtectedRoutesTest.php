<?php

use App\Models\User;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');
});

it('cierra la sesión de una cuenta inactiva y responde 403', function () {
    $user = User::factory()->inactive()->create();

    $this->actingAs($user)
        ->getJson('/api/v1/auth/me')
        ->assertForbidden()
        ->assertExactJson([
            'message' => 'Tu cuenta está inactiva. Reactívala para volver a entrar.',
            'code' => 'account_inactive',
        ]);

    $this->assertGuest('web');
});

it('guarda la hora de inicio de sesión al iniciar sesión', function () {
    User::factory()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'password'])
        ->assertOk()
        ->assertSessionHas('auth.started_at', now()->getTimestamp());
});

it('mantiene la sesión antes de cumplir 12 horas', function () {
    $this->actingAs(User::factory()->create())
        ->withSession(['auth.started_at' => now()->subHours(11)->subMinutes(59)->getTimestamp()])
        ->getJson('/api/v1/auth/me')
        ->assertOk();
});

it('cierra la sesión al cumplir 12 horas aunque haya actividad', function () {
    $this->actingAs(User::factory()->create())
        ->withSession(['auth.started_at' => now()->subHours(12)->getTimestamp()])
        ->getJson('/api/v1/auth/me')
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');

    $this->assertGuest('web');
});

it('responde 429 después de 120 peticiones en un minuto', function () {
    $this->actingAs(User::factory()->create());

    foreach (range(1, 120) as $request) {
        $this->getJson('/api/v1/auth/me')->assertOk();
    }

    $this->getJson('/api/v1/auth/me')
        ->assertTooManyRequests()
        ->assertJsonPath('code', 'too_many_requests');
});
