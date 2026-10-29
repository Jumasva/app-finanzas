<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');

    $this->user = User::factory()->create(['password' => 'mi clave actual 1']);
});

it('desactiva la cuenta, cierra todas sus sesiones y conserva la información', function () {
    DB::table('sessions')->insert([
        'id' => 'otro-dispositivo',
        'user_id' => $this->user->id,
        'payload' => '',
        'last_activity' => now()->getTimestamp(),
    ]);

    $this->actingAs($this->user)
        ->postJson('/api/v1/account/deactivate', ['password' => 'mi clave actual 1'])
        ->assertNoContent();

    $user = $this->user->fresh();
    expect($user->status)->toBe('inactive')
        ->and($user->deactivated_at)->not->toBeNull();

    $this->assertDatabaseMissing('sessions', ['user_id' => $this->user->id]);
    $this->assertGuest('web');
});

it('no deja iniciar sesión con una cuenta desactivada', function () {
    $this->actingAs($this->user)
        ->postJson('/api/v1/account/deactivate', ['password' => 'mi clave actual 1'])
        ->assertNoContent();

    $this->postJson('/api/v1/auth/login', ['email' => $this->user->email, 'password' => 'mi clave actual 1'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'El correo o la contraseña no son válidos.']);
});

it('responde 422 cuando la contraseña es incorrecta', function () {
    $this->actingAs($this->user)
        ->postJson('/api/v1/account/deactivate', ['password' => 'otra clave 9'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['password' => 'La contraseña no es correcta.']);

    expect($this->user->fresh()->status)->toBe('active');
});

it('responde 422 cuando falta la contraseña', function () {
    $this->actingAs($this->user)
        ->postJson('/api/v1/account/deactivate', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['password' => 'Escribe tu contraseña.']);
});

it('responde 401 cuando no hay sesión', function () {
    $this->postJson('/api/v1/account/deactivate', ['password' => 'mi clave actual 1'])
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');
});
