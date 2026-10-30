<?php

namespace App\Exceptions;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * El correo de la cuenta no está verificado: 403 email_not_verified (RF-VECOR-062).
 * La lanzan el inicio de sesión y el middleware EnsureEmailIsVerified.
 */
class EmailNotVerifiedException extends HttpException
{
    public function __construct()
    {
        parent::__construct(403);
    }

    public function render(): JsonResponse
    {
        return response()->json([
            'message' => __('errors.email_not_verified'),
            'code' => 'email_not_verified',
        ], 403);
    }
}
