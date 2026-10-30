<?php

namespace App\Support;

use Carbon\CarbonImmutable;

/**
 * «Hoy» es la fecha de America/Bogota, nunca la fecha UTC del servidor (RN-GEN-001).
 * Las marcas de tiempo se siguen guardando en UTC; esto solo sirve para fechas de negocio.
 */
class Clock
{
    public static function today(): CarbonImmutable
    {
        return CarbonImmutable::now(config('finance.timezone'))->startOfDay();
    }
}
