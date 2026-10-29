<?php

namespace App\Actions\Profile;

use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * Cambia la contraseña y cierra las demás sesiones de la cuenta, sin cerrar la actual (CACON).
 */
class UpdatePassword
{
    public function handle(User $user, string $password, string $currentSessionId): void
    {
        DB::transaction(function () use ($user, $password, $currentSessionId) {
            $user->update(['password' => $password]);

            DB::table('sessions')
                ->where('user_id', $user->id)
                ->where('id', '!=', $currentSessionId)
                ->delete();
        });
    }
}
