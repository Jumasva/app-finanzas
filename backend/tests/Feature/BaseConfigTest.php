<?php

use App\Support\Clock;
use Illuminate\Support\Facades\DB;

it('calcula «hoy» en America/Bogota aunque en UTC ya sea el día siguiente', function () {
    // 8 p. m. del 30 de octubre en Bogotá = 1 a. m. del 31 de octubre en UTC
    $this->travelTo(now('UTC')->setDate(2026, 10, 31)->setTime(1, 0));

    expect(Clock::today()->toDateString())->toBe('2026-10-30');
});

it('busca sin distinguir tildes con la extensión unaccent', function () {
    expect(DB::scalar("SELECT unaccent('Crédito') = 'Credito'"))->toBeTrue();
});
