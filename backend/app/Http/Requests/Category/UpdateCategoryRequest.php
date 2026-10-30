<?php

namespace App\Http\Requests\Category;

use App\Models\Category;
use App\Rules\UniqueCategoryName;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de PATCH /categories/{id}: solo se valida lo que se envía. El nombre no se repite
     * en la clase final, sea la nueva o la actual (RN-CAT-004).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /** @var Category $category */
        $category = $this->route('category');
        $kind = $this->input('kind', $category->kind);

        return [
            'name' => ['sometimes', 'required', 'string', 'max:50', new UniqueCategoryName($kind, $this->user(), $category->id)],
            'kind' => array_filter([
                'sometimes', 'required', 'in:income,expense,obligation',
                // Si solo cambia la clase, se revisa el nombre actual en la clase nueva
                $this->has('name') ? null : new UniqueCategoryName($kind, $this->user(), $category->id, $category->name),
            ]),
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => __('categories.name_required'),
            'kind.required' => __('categories.kind_required'),
        ];
    }
}
