<?php

namespace App\Http\Requests\Concerns;

/**
 * El correo se guarda en minúsculas (RNF-SEG-014), así que se valida y se busca en minúsculas.
 * Los espacios ya los quita el middleware TrimStrings de Laravel.
 */
trait NormalizesEmail
{
    protected function prepareForValidation(): void
    {
        if (is_string($this->email)) {
            $this->merge(['email' => mb_strtolower($this->email)]);
        }
    }
}
