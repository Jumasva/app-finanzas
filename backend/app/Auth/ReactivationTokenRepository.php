<?php

namespace App\Auth;

use Illuminate\Auth\Passwords\DatabaseTokenRepository;

/**
 * Tokens de reactivación: con hash, de 60 minutos y de un solo uso, igual que los de recuperación (RNF-SEG-013).
 * Usa la tabla account_reactivation_tokens; se configura en AppServiceProvider.
 */
class ReactivationTokenRepository extends DatabaseTokenRepository {}
