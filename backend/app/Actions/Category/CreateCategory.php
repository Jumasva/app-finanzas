<?php

namespace App\Actions\Category;

use App\Models\Category;
use App\Models\User;

/**
 * Crea una categoría personalizada, activa y no reservada (GECUS-035 a 037).
 */
class CreateCategory
{
    /**
     * @param  array{name: string, kind: string}  $data
     */
    public function handle(User $user, array $data): Category
    {
        $category = new Category($data);
        $category->user()->associate($user);
        $category->save();

        return $category->refresh();
    }
}
