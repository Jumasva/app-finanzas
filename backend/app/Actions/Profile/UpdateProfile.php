<?php

namespace App\Actions\Profile;

use App\Models\User;

/**
 * Actualiza el nombre, el correo o ambos (COACP).
 */
class UpdateProfile
{
    /**
     * @param  array{name?: string, email?: string}  $data
     */
    public function handle(User $user, array $data): User
    {
        $user->update($data);

        return $user;
    }
}
