<?php

namespace App\Providers;

use App\Auth\EmailVerificationTokenRepository;
use App\Auth\ReactivationTokenRepository;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Mismo mecanismo que los tokens de recuperación, cada uno con su tabla y vigencia (RNF-SEG-013 y 026)
        $this->app->singleton(ReactivationTokenRepository::class, fn ($app) => new ReactivationTokenRepository(
            ...$this->tokenRepositoryArguments($app, 'auth.reactivation'),
        ));

        $this->app->singleton(EmailVerificationTokenRepository::class, fn ($app) => new EmailVerificationTokenRepository(
            ...$this->tokenRepositoryArguments($app, 'auth.verification'),
        ));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // RNF-SEG 1 A 3, 10 a 64 caracteres para la contraseña.
        // Composicion de 10 caracteres, 1 simbolo, 1 numero
        // No contraseñas comprometidas
        Password::defaults(fn () => Password::min(10)->max(64)->numbers()->symbols()->uncompromised());

        // Registro: máximo 5 solicitudes por minuto por IP (RNF-SEG-006)
        RateLimiter::for('register', fn (Request $request) => Limit::perMinute(5)->by($request->ip()));

        // Correos de recuperación, reactivación y verificación: 5 solicitudes por minuto por IP y un correo por minuto por cuenta (RNF-SEG-006)
        RateLimiter::for('account-email', fn (Request $request) => [
            Limit::perMinute(5)->by('ip:'.$request->ip()),
            Limit::perMinute(1)->by('email:'.mb_strtolower((string) $request->input('email'))),
        ]);

        // Rutas privadas: máximo 120 peticiones por minuto por usuario (RNF-SEG-018)
        RateLimiter::for('private', fn (Request $request) => Limit::perMinute(120)->by($request->user()?->id ?: $request->ip()));
    }

    /**
     * Conexión, hasher, tabla, llave y vigencia en segundos de un repositorio de tokens (config/auth.php).
     *
     * @return array<int, mixed>
     */
    private function tokenRepositoryArguments(Application $app, string $config): array
    {
        $key = config('app.key');

        return [
            $app['db']->connection(),
            $app['hash'],
            config("$config.table"),
            str_starts_with($key, 'base64:') ? base64_decode(substr($key, 7)) : $key,
            config("$config.expire") * 60,
        ];
    }
}
