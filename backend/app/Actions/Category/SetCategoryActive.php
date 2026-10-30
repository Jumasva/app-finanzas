<?php

namespace App\Actions\Category;

use App\Models\Category;

/**
 * Activa o desactiva una categoría personalizada. Repetir la acción no es un error (GECUS-041 a 043).
 * Una categoría inactiva no se ofrece en registros nuevos, pero los existentes la conservan (RN-CAT-006).
 */
class SetCategoryActive
{
    public function handle(Category $category, bool $isActive): Category
    {
        $category->forceFill(['is_active' => $isActive])->save();

        return $category;
    }
}
