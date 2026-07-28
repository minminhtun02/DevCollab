<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\CategoryResource;
use App\Services\Contracts\Shared\CategoryServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class WebCategoryController extends Controller
{
    public function __construct(private CategoryServiceInterface $categories)
    {
    }

    public function index(): JsonResponse
    {
        return ApiResponse::success(CategoryResource::collection($this->categories->listActive()));
    }
}
