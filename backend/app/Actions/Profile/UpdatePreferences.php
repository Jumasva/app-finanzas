<?php

namespace App\Actions\Profile;

use App\Models\User;

/**
 * Cambia la moneda principal sin convertir ningún monto registrado (COPRE-042, RN-GEN-009).
 */
class UpdatePreferences
{
    public function handle(User $user, string $currencyCode): User
    {
        $user->update(['currency_code' => $currencyCode]);

        return $user;
    }
}
