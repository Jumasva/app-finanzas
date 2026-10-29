<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\ResetPassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use Illuminate\Http\JsonResponse;

class ResetPasswordController extends Controller
{
    /**
     * POST /auth/reset-password: no inicia sesión; el usuario entra con su contraseña nueva.
     */
    public function __invoke(ResetPasswordRequest $request, ResetPassword $resetPassword): JsonResponse
    {
        $resetPassword->handle($request->validated());

        return response()->json(['message' => __('passwords.reset')]);
    }
}
