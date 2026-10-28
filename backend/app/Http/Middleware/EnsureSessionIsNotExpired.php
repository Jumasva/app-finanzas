<?php

namespace App\Http\Middleware;

use App\Actions\Auth\EndSession;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Cierra la sesión cuando pasan 12 horas desde el inicio de sesión, aunque haya actividad (RNF-SEG-008).
 */
class EnsureSessionIsNotExpired
{
    public function __construct(private EndSession $endSession) {}

    public function handle(Request $request, Closure $next): Response
    {
        $startedAt = $request->session()->get('auth.started_at');

        // Sesiones iniciadas antes de este cambio: empiezan a contar desde ahora
        if ($startedAt === null) {
            $request->session()->put('auth.started_at', now()->getTimestamp());

            return $next($request);
        }

        if (now()->getTimestamp() - $startedAt >= config('session.max_lifetime') * 60) {
            $this->endSession->handle($request);

            throw new AuthenticationException;
        }

        return $next($request);
    }
}
