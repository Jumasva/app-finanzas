<?php

namespace App\Http\Controllers\Profile;

use App\Actions\Profile\UpdateProfile;
use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Resources\UserResource;

class UpdateProfileController extends Controller
{
    /**
     * PATCH /profile: actualiza el nombre, el correo o ambos.
     */
    public function __invoke(UpdateProfileRequest $request, UpdateProfile $updateProfile): UserResource
    {
        $user = $updateProfile->handle($request->user(), $request->validated());

        return UserResource::make($user);
    }
}
