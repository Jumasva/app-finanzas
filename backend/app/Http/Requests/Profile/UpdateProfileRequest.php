<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Solo llega aquí un usuario con sesión: la ruta es privada.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * El correo se compara en minúsculas para que la unicidad no distinga mayúsculas (RNF-SEG-014).
     */
    protected function prepareForValidation(): void
    {
        if (is_string($this->email)) {
            $this->merge(['email' => mb_strtolower($this->email)]);
        }
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
