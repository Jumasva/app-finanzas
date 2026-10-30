<?php

namespace App\Rules;

use App\Models\Category;
use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * El nombre no se repite en la misma clase entre las categorías del usuario y las del sistema,
 * sin distinguir mayúsculas ni tildes: «Alimentacion» choca con «Alimentación» (RN-CAT-004, RNF-DAT-008).
 */
class UniqueCategoryName implements ValidationRule
{
    public function __construct(
        private ?string $kind,
        private User $user,
        private ?int $ignoreId = null,
        // Nombre a revisar cuando la regla va en el campo kind (solo cambia la clase)
        private ?string $name = null,
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Si la clase no es válida, ya lo informa su propia regla
        $name = $this->name ?? $value;

        if (! is_string($name) || ! in_array($this->kind, ['income', 'expense', 'obligation'], true)) {
            return;
        }

        $exists = Category::visibleTo($this->user)
            ->where('kind', $this->kind)
            ->when($this->ignoreId, fn ($query) => $query->whereKeyNot($this->ignoreId))
            ->whereRaw('LOWER(unaccent(name)) = LOWER(unaccent(?))', [$name])
            ->exists();

        if ($exists) {
            $fail('categories.name_taken')->translate();
        }
    }
}
