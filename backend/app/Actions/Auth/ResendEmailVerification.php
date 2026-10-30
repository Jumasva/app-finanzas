<?php

namespace App\Actions\Auth;

use App\Models\User;

/**
 * Reenvía el enlace de verificación solo si la cuenta existe, está activa y no ha verificado el correo (RF-VECOR-063).
 */
class ResendEmailVerification
{
    public function __construct(private SendEmailVerification $sendEmailVerification) {}

    public function handle(string $email): void
    {
        $user = User::where('email', $email)
            ->where('status', 'active')
            ->whereNull('email_verified_at')
            ->first();

        // Sin cuenta pendiente no se envía nada, pero la respuesta es la misma
        if ($user !== null) {
            $this->sendEmailVerification->handle($user);
        }
    }
}
