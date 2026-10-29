<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Cualquier visitante con el enlace puede usarlo: la ruta es pública.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * El correo se guarda en minúsculas, así que se busca en minúsculas (RNF-SEG-014).
     */
    protected function prepareForValidation(): void
    {
        if (is_string($this->email)) {
            $this->merge(['email' => mb_strtolower($this->email)]);
        }
    }

    /**
     * Reglas de POST /auth/reset-password: la contraseña nueva cumple la política (REACC-025).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'token' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ];
    }
}
