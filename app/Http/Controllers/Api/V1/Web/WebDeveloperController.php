<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\DeveloperProfileResource;
use App\Http\Resources\Api\V1\UserResource;
use App\Models\DeveloperProfile;
use App\Services\Contracts\Web\WebDeveloperServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebDeveloperController extends Controller
{
    public function __construct(private WebDeveloperServiceInterface $developers)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->developers->index($request),
            UserResource::class,
        );
    }

    public function show(DeveloperProfile $developerProfile): JsonResponse
    {
        return ApiResponse::success(
            new DeveloperProfileResource($this->developers->show($developerProfile))
        );
    }
}
