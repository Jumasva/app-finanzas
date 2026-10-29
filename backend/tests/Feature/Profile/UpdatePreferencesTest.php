<?php

use App\Models\User;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');

    $this->user = User::factory()->create(['currency_code' => 'COP']);
});

it('cambia la moneda principal', function () {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile/preferences', ['currency_code' => 'USD'])
        ->assertOk()
        ->assertJsonPath('data.currency_code', 'USD');

    expect($this->user->fresh()->currency_code)->toBe('USD');
});

it('responde 422 cuando la moneda no está en la lista', function (mixed $currencyCode, string $message) {
    $this->actingAs($this->user)
        ->patchJson('/api/v1/profile/preferences', ['currency_code' => $currencyCode])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['currency_code' => $message]);

    expect($this->user->fresh()->currency_code)->toBe('COP');
})->with([
    'moneda que no existe en la lista' => ['MXN', 'Elige una moneda de la lista.'],
    'código en minúsculas' => ['usd', 'Elige una moneda de la lista.'],
    'sin moneda' => [null, 'Elige tu moneda.'],
]);

it('responde 401 cuando no hay sesión', function () {
    $this->patchJson('/api/v1/profile/preferences', ['currency_code' => 'USD'])
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');
});
