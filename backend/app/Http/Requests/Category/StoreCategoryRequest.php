<?php

namespace App\Http\Requests\Category;

use App\Rules\UniqueCategoryName;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de POST /categories (RN-CAT-004).
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50', new UniqueCategoryName($this->input('kind'), $this->user())],
            'kind' => ['required', 'in:income,expense,obligation'],
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
