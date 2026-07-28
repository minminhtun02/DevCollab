<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\UpdateJobRequest;
use App\Http\Resources\Api\V1\JobResource;
use App\Models\Job;
use App\Repositories\Contracts\JobRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminJobController extends Controller {
    public function __construct(private JobRepositoryInterface $jobs) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->jobs->paginateForAdmin($request), JobResource::class);
    }
    public function show(Job $job): JsonResponse {
        return ApiResponse::success(new JobResource($job->load(['companyProfile.user', 'category'])));
    }
    public function update(UpdateJobRequest $request, Job $job): JsonResponse {
        return ApiResponse::success(new JobResource($this->jobs->update($job, $request->validated())), 'Job updated.');
    }
    public function destroy(Job $job): JsonResponse {
        $this->jobs->delete($job);
        return ApiResponse::success(null, 'Job deleted.');
    }
}