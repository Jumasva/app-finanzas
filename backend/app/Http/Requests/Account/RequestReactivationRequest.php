<?php

namespace App\Http\Requests\Account;

use Illuminate\Foundation\Http\FormRequest;

class RequestReactivationRequest extends FormRequest
{
    /**
     * Cualquier visitante puede pedir el enlace: la ruta es pública.
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
