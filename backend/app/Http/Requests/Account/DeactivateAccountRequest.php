<?php

namespace App\Http\Requests\Account;

use Illuminate\Foundation\Http\FormRequest;

class DeactivateAccountRequest extends FormRequest
{
    /**
     * Solo llega aquí un usuario con sesión: la ruta es privada.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de POST /account/deactivate: la contraseña confirma la desactivación (GESCU-045).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'password' => ['required', 'string', 'current_password'],
        ];
    }
}
