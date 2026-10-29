<?php

namespace App\Actions\Auth;

use App\Auth\EmailVerificationTokenRepository;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Marca el correo como verificado con un enlace vigente y de un solo uso (RF-VECOR-061).
 */
class VerifyEmail
{
    public function __construct(private EmailVerificationTokenRepository $tokens) {}

    public function handle(string $email, string $token): void
    {
        $user = User::where('email', $email)->whereNull('email_verified_at')->first();

        // Enlace vencido, ya usado o de un correo ya verificado: el mismo mensaje
        if ($user === null || ! $this->tokens->exists($user, $token)) {
            throw ValidationException::withMessages(['token' => __('verification.token')]);
        }

        DB::transaction(function () use ($user) {
            $user->forceFill(['email_verified_at' => now()])->save();

            $this->tokens->delete($user);
        });
    }
}
