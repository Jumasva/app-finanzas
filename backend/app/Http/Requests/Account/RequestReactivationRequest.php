<?php

namespace App\Http\Requests\Account;

use App\Http\Requests\Concerns\NormalizesEmail;
use Illuminate\Foundation\Http\FormRequest;

class RequestReactivationRequest extends FormRequest
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
     * Reglas de POST /account/reactivation-request: solo el formato del correo (GESCU-049).
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
