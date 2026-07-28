<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\ApplyJobRequest;
use App\Http\Resources\Api\V1\JobApplicationResource;
use App\Models\Job;
use App\Models\JobApplication;
use App\Services\Contracts\Web\WebJobApplicationServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebJobApplicationController extends Controller
{
    public function __construct(private WebJobApplicationServiceInterface $applications)
    {
    }

    public function apply(ApplyJobRequest $request, Job $job): JsonResponse
    {
        $application = $this->applications->apply(
            $request->user(),
            $job,
            $request->validated(),
            $request->file('resume'),
        );

        return ApiResponse::success(new JobApplicationResource($application), 'Application submitted.', 201);
    }

    public function myApplications(Request $request): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->applications->myApplications($request->user(), $request),
            JobApplicationResource::class,
        );
    }

    public function withdraw(Request $request, JobApplication $jobApplication): JsonResponse
    {
        $application = $this->applications->withdraw($request->user(), $jobApplication);

        return ApiResponse::success(new JobApplicationResource($application), 'Application withdrawn.');
    }
}
