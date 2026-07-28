<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\SkillResource;
use App\Services\Contracts\Shared\SkillServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebSkillController extends Controller
{
    public function __construct(private SkillServiceInterface $skills)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $categoryId = $request->filled('category_id') ? $request->integer('category_id') : null;

        return ApiResponse::success(SkillResource::collection($this->skills->listActive($categoryId)));
    }
}
