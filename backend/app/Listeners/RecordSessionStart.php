<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;

/**
 * Guarda la hora de inicio de sesión para el límite de 12 horas (RNF-SEG-008).
 */
class RecordSessionStart
{
    public function handle(Login $event): void
    {
        session()->put('auth.started_at', now()->getTimestamp());
    }
}
