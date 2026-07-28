<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\ReviewReportRequest;
use App\Http\Resources\Api\V1\ReportResource;
use App\Models\Report;
use App\Repositories\Contracts\ReportRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminReportController extends Controller {
    public function __construct(private ReportRepositoryInterface $reports) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->reports->paginateForAdmin($request), ReportResource::class);
    }
    public function show(Report $report): JsonResponse {
        return ApiResponse::success(new ReportResource($report->load(['reporter', 'reportedUser', 'reviewer'])));
    }
    public function review(ReviewReportRequest $request, Report $report): JsonResponse {
        return ApiResponse::success(new ReportResource($this->reports->update($report, [
            'status' => ReportStatus::Reviewed,
            'admin_notes' => $request->input('admin_notes'),
            'reviewed_by' => $request->user()->id,
        ])), 'Report marked as reviewed.');
    }
    public function resolve(ReviewReportRequest $request, Report $report): JsonResponse {
        return ApiResponse::success(new ReportResource($this->reports->update($report, [
            'status' => ReportStatus::Resolved,
            'admin_notes' => $request->input('admin_notes'),
            'reviewed_by' => $request->user()->id,
        ])), 'Report resolved.');
    }
    public function reject(ReviewReportRequest $request, Report $report): JsonResponse {
        return ApiResponse::success(new ReportResource($this->reports->update($report, [
            'status' => ReportStatus::Rejected,
            'admin_notes' => $request->input('admin_notes'),
            'reviewed_by' => $request->user()->id,
        ])), 'Report rejected.');
    }
}