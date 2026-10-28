<?php

namespace App\Http\Middleware;

use App\Actions\Auth\EndSession;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Cierra la sesión de una cuenta inactiva y responde 403 account_inactive (RNF-SEG-017).
 */
class EnsureAccountIsActive
{
    public function __construct(private EndSession $endSession) {}

    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->status !== 'active') {
            $this->endSession->handle($request);

            return response()->json([
                'message' => __('errors.account_inactive'),
                'code' => 'account_inactive',
            ], 403);
        }

        return $next($request);
    }
}
