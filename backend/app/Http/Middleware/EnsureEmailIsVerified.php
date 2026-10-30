<?php

namespace App\Http\Middleware;

use App\Exceptions\EmailNotVerifiedException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Bloquea las rutas privadas cuando el correo no está verificado: 403 email_not_verified (RF-VECOR-062).
 * Solo pasa con una sesión abierta antes de cambiar el correo en el perfil; esa sesión puede corregirlo o cerrarse.
 */
class EnsureEmailIsVerified
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->email_verified_at === null) {
            throw new EmailNotVerifiedException;
        }

        return $next($request);
    }
}
