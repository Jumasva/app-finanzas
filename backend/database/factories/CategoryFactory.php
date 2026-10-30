<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Categoría personalizada y activa de un usuario.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->unique()->words(2, true),
            'kind' => 'expense',
            'is_active' => true,
            'is_reserved' => false,
        ];
    }

    /**
     * Categoría del sistema, sin dueño.
     */
    public function system(): static
    {
        return $this->state(fn (array $attributes) => ['user_id' => null]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => ['is_active' => false]);
    }
}
