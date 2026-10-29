<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class ListCurrenciesController extends Controller
{
    /**
     * GET /currencies: monedas disponibles de finance.currencies, con su nombre (COPRE-038).
     */
    public function __invoke(): JsonResponse
    {
        $currencies = collect(config('finance.currencies'))
            ->map(fn (string $code) => ['code' => $code, 'name' => __("currencies.$code")]);

        return response()->json(['data' => $currencies]);
    }
}
