<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

/**
 * Inicia la sesión con correo y contraseña (INISE), con máximo 5 intentos fallidos por minuto (RNF-SEG-005).
 */
class LoginUser
{
    public function handle(string $email, string $password, string $ip): User
    {
        $key = 'login:'.$email.'|'.$ip;

        if (RateLimiter::tooManyAttempts($key, 5)) {
            throw new ThrottleRequestsException(headers: ['Retry-After' => RateLimiter::availableIn($key)]);
        }

        // Solo cuentas activas: una inactiva recibe el mismo mensaje genérico (RNF-SEG-015)
        if (! Auth::guard('web')->attempt(['email' => $email, 'password' => $password, 'status' => 'active'])) {
            RateLimiter::hit($key, 60);

            throw ValidationException::withMessages(['email' => __('auth.failed')]);
        }

        RateLimiter::clear($key);

        return Auth::guard('web')->user();
    }
}
