<?php

namespace App\Actions\Profile;

use App\Actions\Auth\SendEmailVerification;
use App\Models\User;

/**
 * Actualiza el nombre, el correo o ambos (COACP). Un correo nuevo debe verificarse otra vez (RF-VECOR-064).
 */
class UpdateProfile
{
    public function __construct(private SendEmailVerification $sendEmailVerification) {}

    /**
     * @param  array{name?: string, email?: string}  $data
     */
    public function handle(User $user, array $data): User
    {
        $user->fill($data);
        $emailChanged = $user->isDirty('email');

        if ($emailChanged) {
            $user->email_verified_at = null;
        }

        $user->save();

        if ($emailChanged) {
            $this->sendEmailVerification->handle($user);
        }

        return $user;
    }
}
