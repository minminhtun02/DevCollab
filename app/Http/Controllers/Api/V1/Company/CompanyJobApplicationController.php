<?php
namespace App\Http\Controllers\Api\V1\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Company\UpdateJobApplicationStatusRequest;
use App\Http\Resources\Api\V1\JobApplicationResource;
use App\Models\JobApplication;
use App\Services\Contracts\Company\CompanyJobApplicationServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class CompanyJobApplicationController extends Controller {
    public function __construct(private CompanyJobApplicationServiceInterface $applications) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->applications->index($request->user(), $request), JobApplicationResource::class);
    }
    public function show(Request $request, JobApplication $jobApplication): JsonResponse {
        return ApiResponse::success(new JobApplicationResource($this->applications->show($request->user(), $jobApplication)));
    }
    public function updateStatus(UpdateJobApplicationStatusRequest $request, JobApplication $jobApplication): JsonResponse {
        return ApiResponse::success(new JobApplicationResource($this->applications->updateStatus(
            $request->user(), $jobApplication, $request->validated('status'), $request->input('company_notes')
        )), 'Application status updated.');
    }
    public function sendInterviewAcknowledgment(Request $request, JobApplication $jobApplication): JsonResponse {
        return ApiResponse::success(new JobApplicationResource($this->applications->sendInterviewAcknowledgment($request->user(), $jobApplication)), 'Interview acknowledgment sent.');
    }
}