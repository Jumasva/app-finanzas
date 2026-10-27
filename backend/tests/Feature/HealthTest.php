<?php

it('responde ok cuando la base de datos está disponible', function () {
    $this->getJson('/api/v1/health')
        ->assertOk()
        ->assertExactJson(['status' => 'ok']);
});

it('responde 503 cuando la base de datos no responde', function () {
    $default = config('database.default');

    // Conexión a un puerto cerrado: falla de inmediato, sin esperar un timeout
    config([
        'database.connections.unreachable' => array_merge(config("database.connections.$default"), [
            'host' => '127.0.0.1',
            'port' => 1,
        ]),
        'database.default' => 'unreachable',
    ]);

    $response = $this->getJson('/api/v1/health');

    // RefreshDatabase revierte su transacción sobre la conexión predeterminada al terminar
    config(['database.default' => $default]);

    $response->assertServiceUnavailable()
        ->assertExactJson(['status' => 'error']);
});
