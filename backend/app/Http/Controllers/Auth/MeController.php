<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class MeController extends Controller
{
    /**
     * GET /auth/me: devuelve el usuario de la sesión actual (RF-INISE-016).
     */
    public function __invoke(Request $request): UserResource
    {
        return UserResource::make($request->user());
    }
}
