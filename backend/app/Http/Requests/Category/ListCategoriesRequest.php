<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class ListCategoriesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Filtros de GET /categories. Los booleanos de la URL aceptan true, false, 1 y 0.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'kind' => ['nullable', 'in:income,expense,obligation'],
            'is_active' => ['nullable', 'in:true,false,1,0'],
            'assignable' => ['nullable', 'in:true,false,1,0'],
        ];
    }
}
