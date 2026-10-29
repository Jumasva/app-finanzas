<?php

use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

// Las peticiones del frontend llegan con su origen
beforeEach(function () {
    Notification::fake();

    $this->withHeader('Origin', 'http://localhost:3000');
});

it('envía el enlace del frontend a una cuenta activa', function () {
    $user = User::factory()->create(['name' => 'Ana', 'email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/forgot-password', ['email' => 'ANA@correo.com'])
        ->assertOk()
        ->assertExactJson(['message' => 'Si existe una cuenta activa con ese correo, te enviamos un enlace.']);

    Notification::assertSentTo($user, ResetPasswordNotification::class, function (ResetPasswordNotification $notification) use ($user) {
        $mail = $notification->toMail($user);

        expect($mail->subject)->toBe('Restablece tu contraseña')
            ->and($mail->actionUrl)->toStartWith('http://localhost:3000/restablecer-contrasena?token=')
            ->and($mail->actionUrl)->toContain('email=ana%40correo.com');

        return true;
    });
});

it('responde lo mismo y no envía nada cuando el correo no existe', function () {
    $this->postJson('/api/v1/auth/forgot-password', ['email' => 'nadie@correo.com'])
        ->assertOk()
        ->assertExactJson(['message' => 'Si existe una cuenta activa con ese correo, te enviamos un enlace.']);

    Notification::assertNothingSent();
});

it('responde lo mismo y no envía nada cuando la cuenta está inactiva', function () {
    User::factory()->inactive()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/forgot-password', ['email' => 'ana@correo.com'])
        ->assertOk()
        ->assertExactJson(['message' => 'Si existe una cuenta activa con ese correo, te enviamos un enlace.']);

    Notification::assertNothingSent();
});

it('envía el correo por la cola, no durante la petición', function () {
    expect(new ResetPasswordNotification('token'))->toBeInstanceOf(ShouldQueue::class);
});

it('responde 422 cuando el correo no tiene formato válido', function () {
    $this->postJson('/api/v1/auth/forgot-password', ['email' => 'ana-correo.com'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'Escribe un correo válido.']);
});

it('responde 429 cuando se pide otra vez el enlace del mismo correo antes de 60 segundos', function () {
    $this->postJson('/api/v1/auth/forgot-password', ['email' => 'ana@correo.com'])->assertOk();

    $this->postJson('/api/v1/auth/forgot-password', ['email' => 'ana@correo.com'])
        ->assertTooManyRequests()
        ->assertHeader('Retry-After')
        ->assertJsonPath('code', 'too_many_requests');
});

it('responde 429 después de 5 solicitudes por minuto desde la misma IP', function () {
    foreach (range(1, 5) as $attempt) {
        $this->postJson('/api/v1/auth/forgot-password', ['email' => "persona$attempt@correo.com"])->assertOk();
    }

    $this->postJson('/api/v1/auth/forgot-password', ['email' => 'persona6@correo.com'])
        ->assertTooManyRequests();
});
