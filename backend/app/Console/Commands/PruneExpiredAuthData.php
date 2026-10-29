<?php

namespace App\Console\Commands;

use App\Auth\EmailVerificationTokenRepository;
use App\Auth\ReactivationTokenRepository;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;

#[Signature('auth:prune-expired')]
#[Description('Borra los tokens de recuperación, reactivación y verificación vencidos y las sesiones expiradas (RNF-OPE-004)')]
class PruneExpiredAuthData extends Command
{
    public function handle(ReactivationTokenRepository $reactivationTokens, EmailVerificationTokenRepository $verificationTokens): void
    {
        Password::broker()->getRepository()->deleteExpired();
        $reactivationTokens->deleteExpired();
        $verificationTokens->deleteExpired();

        // Una sesión expira tras SESSION_LIFETIME minutos sin actividad (RNF-SEG-007)
        $sessions = DB::table('sessions')
            ->where('last_activity', '<', now()->subMinutes(config('session.lifetime'))->getTimestamp())
            ->delete();

        $this->info("Se borraron {$sessions} sesiones expiradas y los tokens vencidos.");
    }
}
