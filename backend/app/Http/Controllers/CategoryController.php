<?php

namespace App\Http\Controllers;

use App\Actions\Category\CreateCategory;
use App\Actions\Category\SetCategoryActive;
use App\Actions\Category\UpdateCategory;
use App\Http\Requests\Category\ListCategoriesRequest;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    /**
     * GET /categories: las del sistema y las del usuario, sin paginar; primero las del sistema, cada grupo por nombre.
     */
    public function index(ListCategoriesRequest $request): AnonymousResourceCollection
    {
        $categories = Category::visibleTo($request->user())
            ->when($request->filled('kind'), fn ($query) => $query->where('kind', $request->input('kind')))
            ->when($request->filled('is_active'), fn ($query) => $query->where('is_active', $request->boolean('is_active')))
            // Asignables: las que se pueden elegir en un formulario (RN-CAT-003 y 006)
            ->when($request->boolean('assignable'), fn ($query) => $query->where('is_active', true)->where('is_reserved', false))
            ->orderByRaw('user_id IS NOT NULL')
            ->orderBy('name')
            ->get();

        return CategoryResource::collection($categories);
    }

    /**
     * POST /categories
     */
    public function store(StoreCategoryRequest $request, CreateCategory $createCategory): JsonResponse
    {
        $category = $createCategory->handle($request->user(), $request->validated());

        return CategoryResource::make($category)->response()->setStatusCode(201);
    }

    /**
     * PATCH /categories/{id}
     */
    public function update(UpdateCategoryRequest $request, Category $category, UpdateCategory $updateCategory): CategoryResource
    {
        Gate::authorize('update', $category);

        return CategoryResource::make($updateCategory->handle($category, $request->validated()));
    }

    /**
     * PATCH /categories/{id}/deactivate
     */
    public function deactivate(Category $category, SetCategoryActive $setCategoryActive): CategoryResource
    {
        Gate::authorize('update', $category);

        return CategoryResource::make($setCategoryActive->handle($category, false));
    }

    /**
     * PATCH /categories/{id}/activate
     */
    public function activate(Category $category, SetCategoryActive $setCategoryActive): CategoryResource
    {
        Gate::authorize('update', $category);

        return CategoryResource::make($setCategoryActive->handle($category, true));
    }
}
