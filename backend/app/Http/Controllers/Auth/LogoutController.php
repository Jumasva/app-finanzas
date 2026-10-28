<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\EndSession;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LogoutController extends Controller
{
    /**
     * POST /auth/logout: cierra la sesión y regenera el token CSRF (RF-CIESE-018).
     */
    public function __invoke(Request $request, EndSession $endSession): Response
    {
        $endSession->handle($request);

        return response()->noContent();
    }
}
