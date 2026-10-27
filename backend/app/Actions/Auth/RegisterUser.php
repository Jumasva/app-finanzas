<?php

namespace App\Actions\Auth;

use App\Models\User;

/**
 * Crea una cuenta activa con la moneda predeterminada (RF-REUSU-008).
 */
class RegisterUser
{
    /**
     * @param  array{name: string, email: string, password: string}  $data
     */
    public function handle(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);
    }
}
