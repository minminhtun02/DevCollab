<?php
namespace App\Http\Controllers\Api\V1\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Company\StoreJobRequest;
use App\Http\Requests\Api\V1\Company\UpdateJobRequest;
use App\Http\Resources\Api\V1\JobResource;
use App\Models\Job;
use App\Services\Contracts\Company\CompanyJobServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class CompanyJobController extends Controller {
    public function __construct(private CompanyJobServiceInterface $jobs) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->jobs->index($request->user(), $request), JobResource::class);
    }
    public function store(StoreJobRequest $request): JsonResponse {
        return ApiResponse::success(new JobResource($this->jobs->store($request->user(), $request->validated())), 'Job created.', 201);
    }
    public function show(Request $request, Job $job): JsonResponse {
        return ApiResponse::success(new JobResource($this->jobs->show($request->user(), $job)));
    }
    public function update(UpdateJobRequest $request, Job $job): JsonResponse {
        return ApiResponse::success(new JobResource($this->jobs->update($request->user(), $job, $request->validated())), 'Job updated.');
    }
    public function publish(Request $request, Job $job): JsonResponse {
        return ApiResponse::success(new JobResource($this->jobs->publish($request->user(), $job)), 'Job published.');
    }
    public function close(Request $request, Job $job): JsonResponse {
        return ApiResponse::success(new JobResource($this->jobs->close($request->user(), $job)), 'Job closed.');
    }
    public function reopen(Request $request, Job $job): JsonResponse {
        return ApiResponse::success(new JobResource($this->jobs->reopen($request->user(), $job)), 'Job reopened.');
    }
    public function destroy(Request $request, Job $job): JsonResponse {
        $this->jobs->destroy($request->user(), $job);
        return ApiResponse::success(null, 'Job deleted.');
    }
}