<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\SendPasswordResetLink;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use Illuminate\Http\JsonResponse;

class ForgotPasswordController extends Controller
{
    /**
     * POST /auth/forgot-password: siempre responde el mismo mensaje (REACC-022).
     */
    public function __invoke(ForgotPasswordRequest $request, SendPasswordResetLink $sendPasswordResetLink): JsonResponse
    {
        $sendPasswordResetLink->handle($request->validated('email'));

        return response()->json(['message' => __('passwords.sent')]);
    }
}
