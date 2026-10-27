<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Cualquier visitante puede intentar iniciar sesión: la ruta es pública.
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
     * Reglas de POST /auth/login (contrato de API v1).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }
}
