<?php

namespace App\Actions\Auth;

use Illuminate\Support\Facades\Password;

/**
 * Envía el enlace de recuperación solo si la cuenta existe y está activa (REACC-023).
 */
class SendPasswordResetLink
{
    public function handle(string $email): void
    {
        // El resultado no se informa: la respuesta es la misma exista o no la cuenta (REACC-022)
        Password::sendResetLink(['email' => $email, 'status' => 'active']);
    }
}
