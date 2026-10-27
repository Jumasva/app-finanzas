<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');
});

it('cierra la sesión, regenera el token CSRF y bloquea las rutas privadas', function () {
    User::factory()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'password'])
        ->assertOk();

    $csrfToken = session()->token();

    $this->postJson('/api/v1/auth/logout')
        ->assertNoContent();

    $this->assertGuest('web');
    expect(session()->token())->not->toBe($csrfToken);

    // En las pruebas la aplicación no se reinicia entre peticiones y recuerda al usuario: se olvida a mano
    Auth::forgetGuards();

    $this->postJson('/api/v1/auth/logout')
        ->assertUnauthorized();
});

it('responde 401 cuando no hay sesión', function () {
    $this->postJson('/api/v1/auth/logout')
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');
});