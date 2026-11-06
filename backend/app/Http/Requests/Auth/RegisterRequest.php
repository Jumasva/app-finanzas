<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Concerns\NormalizesEmail;
use App\Support\Clock;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    use NormalizesEmail;

    /**
     * Cualquier visitante puede registrarse: la ruta es pública.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de POST /auth/register
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        // La edad se cuenta con «hoy» en America/Bogota (RN-GEN-001)
        $today = Clock::today();
        $latest = $today->subYears(config('finance.registration.min_age'))->toDateString();
        $earliest = $today->subYears(config('finance.registration.max_age'))->toDateString();

        return [
            'name' => ['required', 'string', 'max:100'],
            'birth_date' => ['required', 'date_format:Y-m-d', 'before_or_equal:'.$latest, 'after_or_equal:'.$earliest],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ];
    }

    /**
     * La edad mínima del mensaje sale de config/finance.php, para que no se desfase si cambia.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'birth_date.before_or_equal' => __('validation.custom.birth_date.before_or_equal', [
                'age' => config('finance.registration.min_age'),
            ]),
        ];
    }
}
