<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $wantsJson = fn (Request $request) => $request->is('api/*') || $request->expectsJson();

        $exceptions->shouldRenderJsonWhen($wantsJson);

        // Formato de errores del contrato de API v1: 422 con message y errors; los demás con message y code

        $exceptions->render(function (ValidationException $e, Request $request) use ($wantsJson) {
            if ($wantsJson($request)) {
                return response()->json([
                    'message' => __('errors.validation'),
                    'errors' => $e->errors(),
                ], $e->status);
            }
        });

        $exceptions->render(function (AuthenticationException $e, Request $request) use ($wantsJson) {
            if ($wantsJson($request)) {
                return response()->json([
                    'message' => __('errors.unauthenticated'),
                    'code' => 'unauthenticated',
                ], 401);
            }
        });

        // Incluye ModelNotFoundException: Laravel la convierte en NotFoundHttpException antes de llegar aquí
        $exceptions->render(function (NotFoundHttpException $e, Request $request) use ($wantsJson) {
            if ($wantsJson($request)) {
                return response()->json([
                    'message' => __('errors.not_found'),
                    'code' => 'not_found',
                ], 404);
            }
        });

        // Conserva los encabezados Retry-After y X-RateLimit-*
        $exceptions->render(function (ThrottleRequestsException $e, Request $request) use ($wantsJson) {
            if ($wantsJson($request)) {
                return response()->json([
                    'message' => __('errors.too_many_requests'),
                    'code' => 'too_many_requests',
                ], 429, $e->getHeaders());
            }
        });

        // Errores inesperados: sin detalles técnicos, salvo con APP_DEBUG activo
        $exceptions->render(function (Throwable $e, Request $request) use ($wantsJson) {
            if (! $wantsJson($request) || config('app.debug')
                || $e instanceof HttpExceptionInterface || $e instanceof ValidationException
                || $e instanceof AuthenticationException) {
                return null;
            }

            return response()->json([
                'message' => __('errors.server_error'),
                'code' => 'server_error',
            ], 500);
        });
    })->create();
