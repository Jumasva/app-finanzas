<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // RNF-SEG 1 A 3, 10 a 64 caracteres para la contraseña.
        // Composicion de 10 caracteres, 1 simbolo, 1 numero
        // No contraseñas comprometidas
        Password::defaults(fn () => Password::min(10)->max(64)->numbers()->symbols()->uncompromised());

        // Registro: máximo 5 solicitudes por minuto por IP (RNF-SEG-006)
        RateLimiter::for('register', fn (Request $request) => Limit::perMinute(5)->by($request->ip()));
    }
}
