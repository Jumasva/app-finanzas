<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HealthController;
use Illuminate\Support\Facades\Route;

// grupo v1 endpoints
Route::prefix('v1')->group(function () {
    // # Rutas públicas

    // evalua el estado de salud del la api con la base de datos
    Route::get('/health', HealthController::class);

    // rutas publicas de inicio de sesion y registro
    Route::post('/auth/register', RegisterController::class)->middleware('throttle:register');
    Route::post('/auth/login', LoginController::class);

    Route::middleware('auth:sanctum')->group(function () {
        // # Rutas privadas

        // ruta privada de cierre de sesion (solo usuario con sesion iniciada)
        Route::post('/auth/logout', LogoutController::class);

        // usuario de la sesión actual (el frontend lo consulta al recargar la página)
        Route::get('/auth/me', MeController::class);
    });
});
