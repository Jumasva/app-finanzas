<?php

namespace App\Actions\Category;

use App\Exceptions\ConflictException;
use App\Models\Category;

/**
 * Cambia el nombre o la clase de una categoría personalizada (GECUS-039 y 040).
 */
class UpdateCategory
{
    /**
     * @param  array{name?: string, kind?: string}  $data
     */
    public function handle(Category $category, array $data): Category
    {
        $category->fill($data);

        // La clase solo cambia si ningún movimiento ni obligación la usa (RN-CAT-005)
        if ($category->isDirty('kind') && $category->isInUse()) {
            throw new ConflictException('category_in_use');
        }

        $category->save();

        return $category;
    }
}
