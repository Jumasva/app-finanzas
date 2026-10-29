<?php

namespace App\Actions\Account;

use App\Auth\ReactivationTokenRepository;
use App\Models\User;
use App\Notifications\ReactivateAccountNotification;

/**
 * Envía el enlace de reactivación solo si la cuenta existe y está inactiva (GESCU-049).
 */
class SendReactivationLink
{
    public function __construct(private ReactivationTokenRepository $tokens) {}

    public function handle(string $email): void
    {
        $user = User::where('email', $email)->where('status', 'inactive')->first();

        // Sin cuenta inactiva no se envía nada, pero la respuesta es la misma
        if ($user === null) {
            return;
        }

        $user->notify(new ReactivateAccountNotification($this->tokens->create($user)));
    }
}
