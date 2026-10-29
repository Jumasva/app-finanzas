<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
{
    /**
     * Solo llega aquí un usuario con sesión: la ruta es privada.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de PATCH /profile/password (CACON-035 y CACON-036).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string', 'current_password'],
            'password' => ['required', 'string', 'confirmed', 'different:current_password', Password::defaults()],
        ];
    }
}
