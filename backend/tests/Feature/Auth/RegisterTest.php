<?php

use App\Models\User;
use App\Support\Clock;
use Illuminate\Support\Carbon;
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
        'birth_date' => '1995-04-12',
        'email' => 'Ana@Correo.com',
        'password' => 'mi clave segura 7',
        'password_confirmation' => 'mi clave segura 7',
    ], $overrides);
}

it('crea la cuenta activa en COP, sin verificar y sin iniciar sesión', function () {
    $this->postJson('/api/v1/auth/register', registrationData())
        ->assertCreated()
        ->assertJsonPath('data.name', 'Ana Pérez')
        ->assertJsonPath('data.birth_date', '1995-04-12')
        ->assertJsonPath('data.email', 'ana@correo.com')
        ->assertJsonPath('data.currency_code', 'COP')
        ->assertJsonPath('data.status', 'active')
        ->assertJsonPath('data.email_verified_at', null)
        ->assertJsonMissingPath('data.password');

    $user = User::sole();

    expect($user->birth_date->toDateString())->toBe('1995-04-12');
    expect(Hash::check('mi clave segura 7', $user->password))->toBeTrue();
    $this->assertGuest('web');
});

it('responde 422 cuando faltan los datos', function () {
    $this->postJson('/api/v1/auth/register', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors([
            'name' => 'Escribe tu nombre.',
            'birth_date' => 'Escribe tu fecha de nacimiento.',
            'email' => 'Escribe tu correo.',
            'password' => 'Escribe tu contraseña.',
        ]);
});

it('acepta a quien cumple 18 años hoy en Bogotá', function () {
    // 6 de enero a las 03:00 UTC: en Bogotá todavía es 5 de enero
    Carbon::setTestNow('2026-01-06 03:00:00');

    $this->postJson('/api/v1/auth/register', registrationData(['birth_date' => '2008-01-05']))
        ->assertCreated();
});

it('responde 422 a quien todavía no cumple 18 años', function () {
    $birthDate = Clock::today()->subYears(18)->addDay()->toDateString();

    $this->postJson('/api/v1/auth/register', registrationData(['birth_date' => $birthDate]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['birth_date' => 'Debes tener al menos 18 años para crear una cuenta.']);

    expect(User::count())->toBe(0);
});

it('cuenta la edad con la fecha de Bogotá y no con la UTC', function () {
    // 6 de enero a las 03:00 UTC: en UTC ya cumplió 18, en Bogotá (5 de enero) todavía no
    Carbon::setTestNow('2026-01-06 03:00:00');

    $this->postJson('/api/v1/auth/register', registrationData(['birth_date' => '2008-01-06']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['birth_date' => 'Debes tener al menos 18 años para crear una cuenta.']);
});

it('responde 422 cuando la fecha de nacimiento no es válida', function (string $birthDate) {
    $this->postJson('/api/v1/auth/register', registrationData(['birth_date' => $birthDate]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['birth_date' => 'Escribe una fecha de nacimiento válida.']);
})->with([
    'otro formato' => ['12/04/1995'],
    'fecha que no existe' => ['1995-02-30'],
    'más de 120 años' => ['1890-01-01'],
]);

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
