<?php

namespace App\Policies;

use App\Exceptions\ConflictException;
use App\Models\Category;
use App\Models\User;

/**
 * La propiedad ya la resuelve Category::resolveRouteBinding (404). Aquí van las reglas de estado (409).
 */
class CategoryPolicy
{
    /**
     * Modificar, desactivar o activar: nunca una categoría del sistema (RN-CAT-002).
     */
    public function update(User $user, Category $category): bool
    {
        if ($category->isSystem()) {
            throw new ConflictException('system_category_read_only');
        }

        return $category->user_id === $user->id;
    }
}
