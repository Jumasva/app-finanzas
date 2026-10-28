<?php

namespace App\Actions\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Cierra la sesión actual: olvida al usuario, borra la sesión y regenera el token CSRF (RF-CIESE-018).
 */
class EndSession
{
    public function handle(Request $request): void
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
