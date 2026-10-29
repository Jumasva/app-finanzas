<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;

// Las peticiones del frontend llegan con su origen; sin él, Sanctum no inicia la sesión
beforeEach(function () {
    $this->pwnedResponse = '';
    Http::fake(['api.pwnedpasswords.com/*' => fn () => Http::response($this->pwnedResponse)]);

    Notification::fake();

    $this->withHeader('Origin', 'http://localhost:3000');
});

function registrationData(array $overrides = []): array
{
    return array_merge([
        'name' => 'Ana Pérez',
        'email' => 'Ana@Correo.com',
        'password' => 'mi clave segura 7',
        'password_confirmation' => 'mi clave segura 7',
    ], $overrides);
}

it('crea la cuenta activa en COP e inicia la sesión', function () {
    $this->postJson('/api/v1/auth/register', registrationData())
        ->assertCreated()
        ->assertJsonPath('data.name', 'Ana Pérez')
        ->assertJsonPath('data.email', 'ana@correo.com')
        ->assertJsonPath('data.currency_code', 'COP')
        ->assertJsonPath('data.status', 'active')
        ->assertJsonPath('data.email_verified_at', null)
        ->assertJsonMissingPath('data.password');

    $user = User::sole();

    expect(Hash::check('mi clave segura 7', $user->password))->toBeTrue();
    $this->assertAuthenticatedAs($user);
});

it('responde 422 cuando faltan los datos', function () {
    $this->postJson('/api/v1/auth/register', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors([
            'name' => 'Escribe tu nombre.',
            'email' => 'Escribe tu correo.',
            'password' => 'Escribe tu contraseña.',
        ]);
});

it('responde 422 cuando el correo ya existe, sin distinguir mayúsculas', function () {
    User::factory()->create(['email' => 'ana@correo.com']);

    $this->postJson('/api/v1/auth/register', registrationData(['email' => 'ANA@correo.com']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'Ya existe una cuenta con este correo.']);
});

it('responde 422 cuando las contraseñas no coinciden', function () {
    $this->postJson('/api/v1/auth/register', registrationData(['password_confirmation' => 'otra clave 123']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['password' => 'La confirmación de contraseña no coincide.']);
});

it('responde 422 cuando la contraseña no cumple la política', function (string $password, string $message) {
    $this->postJson('/api/v1/auth/register', registrationData([
        'password' => $password,
        'password_confirmation' => $password,
    ]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['password' => $message]);
})->with([
    'menos de 10 caracteres' => ['clave 12', 'Contraseña debe tener al menos 10 caracteres.'],
    'sin número' => ['mi clave segura', 'Tu contraseña debe incluir al menos un número.'],
    'sin símbolo' => ['miclavesegura7', 'Tu contraseña debe incluir al menos un símbolo, por ejemplo ! # $ o un espacio.'],
]);

it('responde 422 cuando la contraseña aparece en una filtración', function () {
    $hash = strtoupper(sha1('mi clave segura 7'));

    $this->pwnedResponse = substr($hash, 5).':42';

    $this->postJson('/api/v1/auth/register', registrationData())
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['password' => 'Esta contraseña apareció en una filtración de datos. Elige otra.']);
});

it('responde 429 después de 5 solicitudes en un minuto', function () {
    foreach (range(1, 5) as $attempt) {
        $this->postJson('/api/v1/auth/register', [])->assertUnprocessable();
    }

    $this->postJson('/api/v1/auth/register', [])
        ->assertTooManyRequests()
        ->assertJsonPath('code', 'too_many_requests');
});
