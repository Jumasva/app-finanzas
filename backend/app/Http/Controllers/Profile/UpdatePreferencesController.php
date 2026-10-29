<?php

namespace App\Http\Controllers\Profile;

use App\Actions\Profile\UpdatePreferences;
use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdatePreferencesRequest;
use App\Http\Resources\UserResource;

class UpdatePreferencesController extends Controller
{
    /**
     * PATCH /profile/preferences: cambia la moneda principal.
     */
    public function __invoke(UpdatePreferencesRequest $request, UpdatePreferences $updatePreferences): UserResource
    {
        $user = $updatePreferences->handle($request->user(), $request->validated('currency_code'));

        return UserResource::make($user);
    }
}
