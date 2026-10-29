<?php

use App\Models\User;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    $this->withHeader('Origin', 'http://localhost:3000');
});

it('lista las monedas disponibles con su nombre', function () {
    $this->actingAs(User::factory()->create())
        ->getJson('/api/v1/currencies')
        ->assertOk()
        ->assertExactJson([
            'data' => [
                ['code' => 'COP', 'name' => 'Peso colombiano'],
                ['code' => 'USD', 'name' => 'Dólar estadounidense'],
                ['code' => 'EUR', 'name' => 'Euro'],
            ],
        ]);
});

it('responde 401 cuando no hay sesión', function () {
    $this->getJson('/api/v1/currencies')
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');
});
