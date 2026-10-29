<?php

namespace App\Actions\Account;

use App\Auth\ReactivationTokenRepository;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Reactiva la cuenta con un enlace vigente y de un solo uso; no inicia sesión (GESCU-050, GESCU-051).
 */
class ReactivateAccount
{
    public function __construct(private ReactivationTokenRepository $tokens) {}

    public function handle(string $email, string $token): void
    {
        $user = User::where('email', $email)->where('status', 'inactive')->first();

        // Enlace vencido, ya usado o de una cuenta que no está inactiva: el mismo mensaje
        if ($user === null || ! $this->tokens->exists($user, $token)) {
            throw ValidationException::withMessages(['token' => __('reactivation.token')]);
        }

        DB::transaction(function () use ($user) {
            $user->forceFill(['status' => 'active', 'deactivated_at' => null])->save();

            $this->tokens->delete($user);
        });
    }
}
