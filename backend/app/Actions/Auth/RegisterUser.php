<?php

namespace App\Actions\Auth;

use App\Models\User;

/**
 * Crea una cuenta activa con la moneda predeterminada y envía el enlace de verificación (RF-REUSU-008, RF-VECOR-060).
 */
class RegisterUser
{
    public function __construct(private SendEmailVerification $sendEmailVerification) {}

    /**
     * @param  array{name: string, email: string, password: string}  $data
     */
    public function handle(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'currency_code' => config('finance.default_currency'),
        ]);

        $this->sendEmailVerification->handle($user);

        return $user;
    }
}
