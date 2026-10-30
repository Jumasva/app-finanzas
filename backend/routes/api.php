<?php

use App\Http\Controllers\Account\DeactivateAccountController;
use App\Http\Controllers\Account\ReactivateAccountController;
use App\Http\Controllers\Account\RequestReactivationController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\SendVerificationEmailController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\ListCurrenciesController;
use App\Http\Controllers\Profile\UpdatePasswordController;
use App\Http\Controllers\Profile\UpdatePreferencesController;
use App\Http\Controllers\Profile\UpdateProfileController;
use App\Http\Middleware\EnsureAccountIsActive;
use App\Http\Middleware\EnsureEmailIsVerified;
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

    // recuperación de contraseña: pedir el enlace por correo y poner la contraseña nueva
    Route::post('/auth/forgot-password', ForgotPasswordController::class)->middleware('throttle:account-email');
    Route::post('/auth/reset-password', ResetPasswordController::class);

    // reactivación de la cuenta: pedir el enlace por correo y reactivarla
    Route::post('/account/reactivation-request', RequestReactivationController::class)->middleware('throttle:account-email');
    Route::post('/account/reactivate', ReactivateAccountController::class);

    // verificación del correo: verificar con el enlace y pedir que se reenvíe; sin correo verificado no hay sesión
    Route::post('/auth/verify-email', VerifyEmailController::class);
    Route::post('/auth/verification-email', SendVerificationEmailController::class)->middleware('throttle:account-email');

    // # Rutas privadas: sesión iniciada, de menos de 12 horas, cuenta activa y máximo 120 peticiones por minuto
    Route::middleware(['auth:sanctum', EnsureSessionIsNotExpired::class, EnsureAccountIsActive::class, 'throttle:private'])->group(function () {
        // ruta privada de cierre de sesion (solo usuario con sesion iniciada)
        Route::post('/auth/logout', LogoutController::class);

        // usuario de la sesión actual (el frontend lo consulta al recargar la página)
        Route::get('/auth/me', MeController::class);

        // actualizar nombre o correo; se permite sin verificar para poder corregir un correo mal escrito
        Route::patch('/profile', UpdateProfileController::class);

        // # Rutas que además exigen el correo verificado (403 email_not_verified)
        Route::middleware(EnsureEmailIsVerified::class)->group(function () {
            // cambiar la contraseña (cierra las demás sesiones)
            Route::patch('/profile/password', UpdatePasswordController::class);

            // cambiar la moneda principal (no convierte ningún monto)
            Route::patch('/profile/preferences', UpdatePreferencesController::class);

            // monedas disponibles
            Route::get('/currencies', ListCurrenciesController::class);

            // desactivar la cuenta (cierra todas sus sesiones; la información se conserva)
            Route::post('/account/deactivate', DeactivateAccountController::class);
        });
    });
});
