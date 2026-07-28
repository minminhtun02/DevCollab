<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\JobResource;
use App\Models\Job;
use App\Services\Contracts\Web\WebJobServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebJobController extends Controller
{
    public function __construct(private WebJobServiceInterface $jobs)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $paginator = $this->jobs->index($request);

        return ApiResponse::withPagination($paginator, JobResource::class);
    }

    public function show(Job $job): JsonResponse
    {
        return ApiResponse::success(new JobResource($this->jobs->show($job)));
    }
}
