<?php

use App\Auth\ReactivationTokenRepository;
use App\Models\User;
use App\Notifications\ReactivateAccountNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

// Las peticiones del frontend llegan con su origen
beforeEach(function () {
    Notification::fake();

    $this->withHeader('Origin', 'http://localhost:3000');
});

// Token vigente de reactivación, como el que llega en el correo
function reactivationToken(User $user): string
{
    return app(ReactivationTokenRepository::class)->create($user);
}

it('envía el enlace del frontend a una cuenta inactiva', function () {
    $user = User::factory()->inactive()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/account/reactivation-request', ['email' => 'ANA@correo.com'])
        ->assertOk()
        ->assertExactJson(['message' => 'Si existe una cuenta inactiva con ese correo, te enviamos un enlace para reactivarla.']);

    Notification::assertSentTo($user, ReactivateAccountNotification::class, function (ReactivateAccountNotification $notification) use ($user) {
        $mail = $notification->toMail($user);

        expect($mail->subject)->toBe('Reactiva tu cuenta')
            ->and($mail->actionUrl)->toStartWith('http://localhost:3000/reactivar-cuenta?token=')
            ->and($mail->actionUrl)->toContain('email=ana%40correo.com');

        return true;
    });
});

it('responde lo mismo y no envía nada cuando la cuenta está activa o no existe', function (string $email) {
    User::factory()->create(['email' => 'activa@correo.com']);

    $this->postJson('/api/v1/account/reactivation-request', ['email' => $email])
        ->assertOk()
        ->assertExactJson(['message' => 'Si existe una cuenta inactiva con ese correo, te enviamos un enlace para reactivarla.']);

    Notification::assertNothingSent();
})->with([
    'cuenta activa' => ['activa@correo.com'],
    'correo que no existe' => ['nadie@correo.com'],
]);

it('envía el correo de reactivación por la cola', function () {
    expect(new ReactivateAccountNotification('token'))->toBeInstanceOf(ShouldQueue::class);
});

it('responde 422 cuando el correo no tiene formato válido', function () {
    $this->postJson('/api/v1/account/reactivation-request', ['email' => 'ana-correo.com'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'Escribe un correo válido.']);
});

it('responde 429 cuando se pide otra vez el enlace antes de 60 segundos', function () {
    $this->postJson('/api/v1/account/reactivation-request', ['email' => 'ana@correo.com'])->assertOk();

    $this->postJson('/api/v1/account/reactivation-request', ['email' => 'ana@correo.com'])
        ->assertTooManyRequests()
        ->assertJsonPath('code', 'too_many_requests');
});

it('reactiva la cuenta con un enlace vigente y no inicia sesión', function () {
    $user = User::factory()->inactive()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/account/reactivate', ['email' => 'ana@correo.com', 'token' => reactivationToken($user)])
        ->assertOk()
        ->assertExactJson(['message' => 'Reactivamos tu cuenta. Inicia sesión para continuar.']);

    $user = $user->fresh();
    expect($user->status)->toBe('active')
        ->and($user->deactivated_at)->toBeNull();

    $this->assertGuest('web');

    $this->postJson('/api/v1/auth/login', ['email' => 'ana@correo.com', 'password' => 'password'])
        ->assertOk();
});

it('no deja usar el mismo enlace dos veces', function () {
    $user = User::factory()->inactive()->create(['email' => 'ana@correo.com']);
    $token = reactivationToken($user);

    $this->postJson('/api/v1/account/reactivate', ['email' => 'ana@correo.com', 'token' => $token])->assertOk();
    $user->forceFill(['status' => 'inactive'])->save();

    $this->postJson('/api/v1/account/reactivate', ['email' => 'ana@correo.com', 'token' => $token])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);
});

it('responde 422 cuando el enlace venció después de 60 minutos', function () {
    $user = User::factory()->inactive()->create(['email' => 'ana@correo.com']);
    $token = reactivationToken($user);

    $this->travel(61)->minutes();

    $this->postJson('/api/v1/account/reactivate', ['email' => 'ana@correo.com', 'token' => $token])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);

    expect($user->fresh()->status)->toBe('inactive');
});

it('responde 422 cuando el token no es válido', function () {
    User::factory()->inactive()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/account/reactivate', ['email' => 'ana@correo.com', 'token' => 'token-inventado'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['token' => 'El enlace no es válido o ya venció. Pide uno nuevo.']);
});

it('responde 422 cuando faltan los datos', function () {
    $this->postJson('/api/v1/account/reactivate', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email', 'token']);
});
