<?php

use App\Models\User;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no inicia la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');
});

it('inicia la sesión con el correo y la contraseña correctos', function () {
    $user = User::factory()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'password'])
        ->assertOk()
        ->assertJsonPath('data.email', 'ana@correo.com');

    $this->assertAuthenticatedAs($user);
});

it('acepta el correo escrito con mayúsculas', function () {
    $user = User::factory()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/login', ['email' => 'ANA@Correo.com', 'password' => 'password'])
        ->assertOk()
        ->assertJsonPath('data.email', 'ana@correo.com');

    $this->assertAuthenticatedAs($user);
});

it('responde 422 con el mensaje genérico cuando la contraseña es incorrecta', function () {
    User::factory()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'otra-clave'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'El correo o la contraseña no son válidos.']);

    $this->assertGuest();
});

it('responde el mismo 422 cuando el correo no existe', function () {
    $this->postJson('/api/v1/auth/login', ['email' => 'nadie@correo.com', 'password' => 'password'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'El correo o la contraseña no son válidos.']);

    $this->assertGuest();
});

it('responde el mismo 422 cuando la cuenta está inactiva', function () {
    User::factory()->inactive()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'password'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'El correo o la contraseña no son válidos.']);

    $this->assertGuest();
});

it('responde 403 sin iniciar sesión cuando el correo no está verificado', function () {
    User::factory()->unverified()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'password'])
        ->assertForbidden()
        ->assertExactJson([
            'message' => 'Verifica tu correo para iniciar sesión. Revisa el enlace que te enviamos.',
            'code' => 'email_not_verified',
        ]);

    $this->assertGuest('web');
});

it('responde el 422 genérico cuando el correo no está verificado y la contraseña es incorrecta', function () {
    User::factory()->unverified()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'otra-clave'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'El correo o la contraseña no son válidos.']);
});

it('responde 422 cuando faltan los datos', function () {
    $this->postJson('/api/v1/auth/login', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors([
            'email' => 'Escribe tu correo.',
            'password' => 'Escribe tu contraseña.',
        ]);
});

it('responde 429 después de 5 intentos fallidos en un minuto', function () {
    User::factory()->create(['email' => 'ana@correo.com']);

    foreach (range(1, 5) as $attempt) {
        $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'otra-clave'])
            ->assertUnprocessable();
    }

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'password'])
        ->assertTooManyRequests()
        ->assertHeader('Retry-After')
        ->assertJsonPath('code', 'too_many_requests');

    $this->assertGuest();
});
