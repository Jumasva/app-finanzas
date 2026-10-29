<?php

namespace App\Http\Controllers\Account;

use App\Actions\Account\DeactivateAccount;
use App\Actions\Auth\EndSession;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\DeactivateAccountRequest;
use Illuminate\Http\Response;

class DeactivateAccountController extends Controller
{
    /**
     * POST /account/deactivate: desactiva la cuenta y cierra también la sesión actual.
     */
    public function __invoke(DeactivateAccountRequest $request, DeactivateAccount $deactivateAccount, EndSession $endSession): Response
    {
        $deactivateAccount->handle($request->user());

        $endSession->handle($request);

        return response()->noContent();
    }
}
