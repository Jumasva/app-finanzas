<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\Profile\UpdatePasswordController;
use App\Http\Controllers\Profile\UpdateProfileController;
use App\Http\Middleware\EnsureAccountIsActive;
use App\Http\Middleware\EnsureSessionIsNotExpired;
use Illuminate\Support\Facades\Route;

// grupo v1 endpoints
Route::prefix('v1')->group(function () {
    // # Rutas públicas

    // evalua el estado de salud del la api con la base de datos
    Route::get('/health', HealthController::class);

    // rutas publicas de inicio de sesion y registro
    Route::post('/auth/register', RegisterController::class)->middleware('throttle:register');
    Route::post('/auth/login', LoginController::class);

    // # Rutas privadas: sesión iniciada, de menos de 12 horas, cuenta activa y máximo 120 peticiones por minuto
    Route::middleware(['auth:sanctum', EnsureSessionIsNotExpired::class, EnsureAccountIsActive::class, 'throttle:private'])->group(function () {
        // ruta privada de cierre de sesion (solo usuario con sesion iniciada)
        Route::post('/auth/logout', LogoutController::class);

        // usuario de la sesión actual (el frontend lo consulta al recargar la página)
        Route::get('/auth/me', MeController::class);

        // actualizar nombre o correo del usuario
        Route::patch('/profile', UpdateProfileController::class);

        // cambiar la contraseña (cierra las demás sesiones)
        Route::patch('/profile/password', UpdatePasswordController::class);
    });
});
