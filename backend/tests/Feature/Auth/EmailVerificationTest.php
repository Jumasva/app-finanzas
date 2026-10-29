<?php

use App\Auth\EmailVerificationTokenRepository;
use App\Models\User;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no usa la sesión
beforeEach(function () {
    Notification::fake();
    Http::fake(['api.pwnedpasswords.com/*' => Http::response('')]);

    $this->withHeader('Origin', 'http://localhost:3000');
});

// Token vigente de verificación, como el que llega en el correo
function verificationToken(User $user): string
{
    return app(EmailVerificationTokenRepository::class)->create($user);
}

it('envía el enlace del frontend al registrarse', function () {
    $this->postJson('/api/v1/auth/register', [
        'name' => 'Ana',
        'email' => 'ana@correo.com',
        'password' => 'mi clave segura 7',
        'password_confirmation' => 'mi clave segura 7',
    ])->assertCreated();

    $user = User::sole();

    Notification::assertSentTo($user, VerifyEmailNotification::class, function (VerifyEmailNotification $notification) use ($user) {
        $mail = $notification->toMail($user);

        expect($mail->subject)->toBe('Verifica tu correo')
            ->and($mail->actionUrl)->toStartWith('http://localhost:3000/verificar-correo?token=')
            ->and($mail->actionUrl)->toContain('email=ana%40correo.com');

        return true;
    });
});

it('envía el correo de verificación por la cola', function () {
    expect(new VerifyEmailNotification('token'))->toBeInstanceOf(ShouldQueue::class);
});

it('bloquea las rutas que exigen el correo verificado con 403 y mantiene la sesión', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->getJson('/api/v1/currencies')
        ->assertForbidden()
        ->assertExactJson([
            'message' => 'Verifica tu correo para continuar. Revisa el enlace que te enviamos.',
            'code' => 'email_not_verified',
        ]);

    $this->getJson('/api/v1/auth/me')
        ->assertOk()
        ->assertJsonPath('data.email_verified_at', null);

    $this->assertAuthenticatedAs($user);
});

it('verifica el correo con un enlace vigente', function () {
    $user = User::factory()->unverified()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/verify-email', ['email' => 'ANA@correo.com', 'token' => verificationToken($user)])
        ->assertOk()
        ->assertExactJson(['message' => 'Verificamos tu correo. Ya puedes usar la aplicación.']);

    expect($user->fresh()->email_verified_at)->not->toBeNull();

    $this->actingAs($user->fresh())
        ->getJson('/api/v1/currencies')
        ->assertOk();
});

it('no deja usar el mismo enlace dos veces', function () {
    $user = User::factory()->unverified()->create(['email' => 'ana@correo.com']);
    $token = verificationToken($user);

    $this->postJson('/api/v1/auth/verify-email', ['email' => 'ana@correo.com', 'token' => $token])->assertOk();

    $this->postJson('/api/v1/auth/verify-email', ['email' => 'ana@correo.com', 'token' => $token])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);
});

it('responde 422 cuando el enlace venció después de 24 horas', function () {
    $user = User::factory()->unverified()->create(['email' => 'ana@correo.com']);
    $token = verificationToken($user);

    $this->travel(24)->hours();
    $this->travel(1)->minutes();

    $this->postJson('/api/v1/auth/verify-email', ['email' => 'ana@correo.com', 'token' => $token])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);

    expect($user->fresh()->email_verified_at)->toBeNull();
});

it('responde 422 cuando el token no es válido o faltan los datos', function (array $data, array $errors) {
    User::factory()->unverified()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/verify-email', $data)
        ->assertUnprocessable()
        ->assertJsonValidationErrors($errors);
})->with([
    'token inventado' => [['email' => 'ana@correo.com', 'token' => 'token-inventado'], ['token']],
    'sin datos' => [[], ['email', 'token']],
]);

it('reenvía el correo de verificación a la cuenta de la sesión', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->postJson('/api/v1/auth/verification-email')
        ->assertOk()
        ->assertExactJson(['message' => 'Te enviamos un enlace para verificar tu correo.']);

    Notification::assertSentTo($user, VerifyEmailNotification::class);
});

it('no reenvía nada cuando el correo ya está verificado', function () {
    $this->actingAs(User::factory()->create())
        ->postJson('/api/v1/auth/verification-email')
        ->assertOk()
        ->assertExactJson(['message' => 'Tu correo ya está verificado.']);

    Notification::assertNothingSent();
});

it('responde 429 cuando se reenvía el correo otra vez antes de 60 segundos', function () {
    $this->actingAs(User::factory()->unverified()->create());

    $this->postJson('/api/v1/auth/verification-email')->assertOk();

    $this->postJson('/api/v1/auth/verification-email')
        ->assertTooManyRequests()
        ->assertJsonPath('code', 'too_many_requests');
});

it('responde 401 al reenviar el correo sin sesión', function () {
    $this->postJson('/api/v1/auth/verification-email')
        ->assertUnauthorized()
        ->assertJsonPath('code', 'unauthenticated');
});
