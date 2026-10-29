<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePreferencesRequest extends FormRequest
{
    /**
     * Solo llega aquí un usuario con sesión: la ruta es privada.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de PATCH /profile/preferences: la moneda debe estar en finance.currencies (RNF-PRE-001).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'currency_code' => ['required', 'string', Rule::in(config('finance.currencies'))],
        ];
    }
}
