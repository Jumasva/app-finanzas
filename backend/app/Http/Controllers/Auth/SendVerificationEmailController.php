<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\SendEmailVerification;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SendVerificationEmailController extends Controller
{
    /**
     * POST /auth/verification-email: reenvía el enlace de verificación al correo de la sesión (RF-VECOR-063).
     */
    public function __invoke(Request $request, SendEmailVerification $sendEmailVerification): JsonResponse
    {
        if ($request->user()->email_verified_at !== null) {
            return response()->json(['message' => __('verification.already_verified')]);
        }

        $sendEmailVerification->handle($request->user());

        return response()->json(['message' => __('verification.sent')]);
    }
}
