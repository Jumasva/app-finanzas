<?php

namespace App\Http\Controllers\Account;

use App\Actions\Account\SendReactivationLink;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\RequestReactivationRequest;
use Illuminate\Http\JsonResponse;

class RequestReactivationController extends Controller
{
    /**
     * POST /account/reactivation-request: siempre responde el mismo mensaje.
     */
    public function __invoke(RequestReactivationRequest $request, SendReactivationLink $sendReactivationLink): JsonResponse
    {
        $sendReactivationLink->handle($request->validated('email'));

        return response()->json(['message' => __('reactivation.sent')]);
    }
}
