<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\VerifyEmail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerifyEmailRequest;
use Illuminate\Http\JsonResponse;

class VerifyEmailController extends Controller
{
    /**
     * POST /auth/verify-email: marca el correo como verificado; no inicia sesión.
     */
    public function __invoke(VerifyEmailRequest $request, VerifyEmail $verifyEmail): JsonResponse
    {
        $verifyEmail->handle($request->validated('email'), $request->validated('token'));

        return response()->json(['message' => __('verification.verified')]);
    }
}
