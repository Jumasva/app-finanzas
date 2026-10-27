<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\LoginUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;

class LoginController extends Controller
{
    /**
     * POST /auth/login: inicia la sesión y devuelve el usuario.
     */
    public function __invoke(LoginRequest $request, LoginUser $loginUser): UserResource
    {
        $user = $loginUser->handle($request->validated('email'), $request->validated('password'), $request->ip());

        $request->session()->regenerate();

        return UserResource::make($user);
    }
}
