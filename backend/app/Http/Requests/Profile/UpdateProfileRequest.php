<?php

namespace App\Http\Requests\Profile;

use App\Http\Requests\Concerns\NormalizesEmail;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    use NormalizesEmail;

    /**
     * Solo llega aquí un usuario con sesión: la ruta es privada.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de PATCH /profile (contrato de API v1): solo se valida lo que se envía.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:100'],
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($this->user())],
        ];
    }
}
