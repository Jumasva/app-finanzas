<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

/**
 * Pone la contraseña nueva con un enlace vigente y de un solo uso, y cierra todas las sesiones (REACC-024 a 026).
 */
class ResetPassword
{
    /**
     * @param  array{token: string, email: string, password: string}  $data
     */
    public function handle(array $data): void
    {
        $status = Password::reset(
            [...$data, 'status' => 'active'],
            function (User $user, string $password) {
                DB::transaction(function () use ($user, $password) {
                    $user->update(['password' => $password]);

                    DB::table('sessions')->where('user_id', $user->id)->delete();
                });
            },
        );

        // Enlace vencido, ya usado o de una cuenta que no está activa: el mismo mensaje
        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages(['token' => __('passwords.token')]);
        }
    }
}
