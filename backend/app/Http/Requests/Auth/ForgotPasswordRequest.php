<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Concerns\NormalizesEmail;
use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordRequest extends FormRequest
{
    use NormalizesEmail;

    /**
     * Cualquier visitante puede pedir el enlace: la ruta es pública.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de POST /auth/forgot-password: solo el formato del correo (REACC-021).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
        ];
    }
}
