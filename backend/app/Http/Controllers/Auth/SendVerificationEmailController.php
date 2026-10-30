<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\ResendEmailVerification;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResendVerificationEmailRequest;
use Illuminate\Http\JsonResponse;

class SendVerificationEmailController extends Controller
{
    /**
     * POST /auth/verification-email: siempre responde el mismo mensaje, exista o no una cuenta pendiente.
     */
    public function __invoke(ResendVerificationEmailRequest $request, ResendEmailVerification $resendEmailVerification): JsonResponse
    {
        $resendEmailVerification->handle($request->validated('email'));

        return response()->json(['message' => __('verification.sent')]);
    }
}
