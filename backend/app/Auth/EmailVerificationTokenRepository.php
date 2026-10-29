<?php

namespace App\Auth;

use Illuminate\Auth\Passwords\DatabaseTokenRepository;

/**
 * Tokens de verificación del correo: con hash, de 24 horas y de un solo uso (RNF-SEG-026).
 * Usa la tabla email_verification_tokens; se configura en AppServiceProvider.
 */
class EmailVerificationTokenRepository extends DatabaseTokenRepository {}
