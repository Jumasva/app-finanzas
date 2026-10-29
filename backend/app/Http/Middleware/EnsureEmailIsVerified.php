<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Bloquea las rutas privadas hasta que el correo esté verificado: 403 email_not_verified (RF-VECOR-062).
 * La sesión sigue abierta para poder consultar /auth/me, reenviar el correo o cerrar sesión.
 */
class EnsureEmailIsVerified
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->email_verified_at === null) {
            return response()->json([
                'message' => __('errors.email_not_verified'),
                'code' => 'email_not_verified',
            ], 403);
        }

        return $next($request);
    }
}
