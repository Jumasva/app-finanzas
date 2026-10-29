<?php

namespace App\Http\Controllers\Account;

use App\Actions\Account\ReactivateAccount;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\ReactivateAccountRequest;
use Illuminate\Http\JsonResponse;

class ReactivateAccountController extends Controller
{
    /**
     * POST /account/reactivate: la cuenta vuelve a estar activa; el usuario debe iniciar sesión.
     */
    public function __invoke(ReactivateAccountRequest $request, ReactivateAccount $reactivateAccount): JsonResponse
    {
        $reactivateAccount->handle($request->validated('email'), $request->validated('token'));

        return response()->json(['message' => __('reactivation.reactivated')]);
    }
}
