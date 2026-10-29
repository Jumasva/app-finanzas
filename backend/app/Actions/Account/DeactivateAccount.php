<?php

namespace App\Actions\Account;

use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * Desactiva la cuenta y cierra todas sus sesiones; la información se conserva (GESCU-046 y GESCU-047).
 */
class DeactivateAccount
{
    public function handle(User $user): void
    {
        DB::transaction(function () use ($user) {
            $user->forceFill(['status' => 'inactive', 'deactivated_at' => now()])->save();

            DB::table('sessions')->where('user_id', $user->id)->delete();
        });
    }
}
