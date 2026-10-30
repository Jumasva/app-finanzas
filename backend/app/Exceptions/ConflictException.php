<?php

namespace App\Exceptions;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * La operación choca con el estado del registro: 409 con un código estable del contrato de API v1.
 * El mensaje está en lang/es/errors.php con la misma clave que el código.
 */
class ConflictException extends HttpException
{
    public function __construct(public readonly string $errorCode)
    {
        parent::__construct(409);
    }

    public function render(): JsonResponse
    {
        return response()->json([
            'message' => __("errors.{$this->errorCode}"),
            'code' => $this->errorCode,
        ], 409);
    }
}
