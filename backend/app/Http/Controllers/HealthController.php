<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Estado del servicio (RNF-OPE-005): ok solo si la aplicación y la base de datos responden.
 */
class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        try {
            DB::select('SELECT 1');
        } catch (Throwable $e) {
            Log::error('Health check: la base de datos no responde.', ['exception' => $e::class]);

            return response()->json(['status' => 'error'], 503);
        }

        return response()->json(['status' => 'ok']);
    }
}
