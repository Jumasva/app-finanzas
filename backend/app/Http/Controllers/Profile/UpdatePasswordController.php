<?php

namespace App\Http\Controllers\Profile;

use App\Actions\Profile\UpdatePassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdatePasswordRequest;
use Illuminate\Http\JsonResponse;

class UpdatePasswordController extends Controller
{
    /**
     * PATCH /profile/password: cambia la contraseña y cierra las demás sesiones.
     */
    public function __invoke(UpdatePasswordRequest $request, UpdatePassword $updatePassword): JsonResponse
    {
        $updatePassword->handle($request->user(), $request->validated('password'), $request->session()->getId());

        return response()->json(['message' => __('auth.password_updated')]);
    }
}
