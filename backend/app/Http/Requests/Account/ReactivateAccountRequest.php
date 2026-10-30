<?php

namespace App\Http\Requests\Account;

use App\Http\Requests\Concerns\NormalizesEmail;
use Illuminate\Foundation\Http\FormRequest;

class ReactivateAccountRequest extends FormRequest
{
    use NormalizesEmail;

    /**
     * Cualquier visitante con el enlace puede usarlo: la ruta es pública.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de POST /account/reactivate: el correo y el token llegan en el enlace (GESCU-050).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'token' => ['required', 'string'],
        ];
    }
}
