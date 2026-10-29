<?php

namespace App\Actions\Auth;

use App\Auth\EmailVerificationTokenRepository;
use App\Models\User;
use App\Notifications\VerifyEmailNotification;

/**
 * Envía el enlace para verificar el correo de la cuenta (RF-VECOR-060 y 063).
 */
class SendEmailVerification
{
    public function __construct(private EmailVerificationTokenRepository $tokens) {}

    public function handle(User $user): void
    {
        $user->notify(new VerifyEmailNotification($this->tokens->create($user)));
    }
}
