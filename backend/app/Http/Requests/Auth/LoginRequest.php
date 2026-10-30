<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Concerns\NormalizesEmail;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    use NormalizesEmail;

    /**
     * Cualquier visitante puede intentar iniciar sesión: la ruta es pública.
     */
    public function authorize(): bool
    {
        return true;
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
