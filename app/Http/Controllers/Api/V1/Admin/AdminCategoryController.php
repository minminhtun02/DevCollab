<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\StoreCategoryRequest;
use App\Http\Requests\Api\V1\Admin\UpdateCategoryRequest;
use App\Http\Resources\Api\V1\CategoryResource;
use App\Models\Category;
use App\Services\Contracts\Shared\CategoryServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminCategoryController extends Controller {
    public function __construct(private CategoryServiceInterface $categories) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->categories->paginate($request), CategoryResource::class);
    }
    public function store(StoreCategoryRequest $request): JsonResponse {
        return ApiResponse::success(new CategoryResource($this->categories->create($request->validated())), 'Category created.', 201);
    }
    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse {
        return ApiResponse::success(new CategoryResource($this->categories->update($category, $request->validated())), 'Category updated.');
    }
    public function destroy(Category $category): JsonResponse {
        $this->categories->delete($category);
        return ApiResponse::success(null, 'Category deleted.');
    }
}