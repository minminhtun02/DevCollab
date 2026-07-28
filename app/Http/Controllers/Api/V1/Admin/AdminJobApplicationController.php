<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\JobApplicationResource;
use App\Models\JobApplication;
use App\Repositories\Contracts\JobApplicationRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminJobApplicationController extends Controller {
    public function __construct(private JobApplicationRepositoryInterface $applications) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->applications->paginateForAdmin($request), JobApplicationResource::class);
    }
    public function show(JobApplication $jobApplication): JsonResponse {
        return ApiResponse::success(new JobApplicationResource($jobApplication->load(['user', 'job.companyProfile'])));
    }
}