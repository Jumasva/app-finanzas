<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas de prueba para provocar cada error del contrato de API v1
beforeEach(function () {
    Route::prefix('api/test')->middleware('api')->group(function () {
        Route::get('/private', fn () => 'ok')->middleware('auth:sanctum');
        Route::post('/validation', fn (Request $request) => $request->validate(['name' => 'required']));
        Route::get('/throttled', fn () => 'ok')->middleware('throttle:1,1');
        Route::get('/crash', fn () => throw new RuntimeException('detalle interno'));
    });
});

it('responde 401 con el código unauthenticated', function () {
    $this->getJson('/api/test/private')
        ->assertUnauthorized()
        ->assertExactJson([
            'message' => 'Tu sesión no está activa. Inicia sesión para continuar.',
            'code' => 'unauthenticated',
        ]);
});

it('responde 404 con el código not_found', function () {
    $this->getJson('/api/v1/no-existe')
        ->assertNotFound()
        ->assertExactJson([
            'message' => 'No encontramos este registro.',
            'code' => 'not_found',
        ]);
});

it('responde 422 con el mensaje general y los errores por campo en español', function () {
    $this->postJson('/api/test/validation')
        ->assertUnprocessable()
        ->assertJsonPath('message', 'Revisa los datos del formulario.')
        ->assertJsonStructure(['message', 'errors' => ['name']]);
});

it('responde 429 con el código too_many_requests y el encabezado Retry-After', function () {
    $this->getJson('/api/test/throttled')->assertOk();

    $this->getJson('/api/test/throttled')
        ->assertTooManyRequests()
        ->assertHeader('Retry-After')
        ->assertJsonPath('code', 'too_many_requests');
});

it('responde 500 sin detalles técnicos cuando APP_DEBUG está apagado', function () {
    config(['app.debug' => false]);

    $this->getJson('/api/test/crash')
        ->assertInternalServerError()
        ->assertExactJson([
            'message' => 'Ocurrió un error inesperado. Intenta de nuevo más tarde.',
            'code' => 'server_error',
        ]);
});

it('permite que el frontend envíe la cookie de sesión (CORS con credenciales)', function () {
    $this->withHeaders(['Origin' => 'http://localhost:3000'])
        ->getJson('/api/v1/health')
        ->assertOk()
        ->assertHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->assertHeader('Access-Control-Allow-Credentials', 'true');
});
