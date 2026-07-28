<?php
namespace App\Http\Controllers\Api\V1\Company;
use App\Http\Controllers\Controller;
use App\Services\Contracts\Company\CompanyDashboardServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class CompanyDashboardController extends Controller {
    public function __construct(private CompanyDashboardServiceInterface $dashboard) {}
    public function stats(Request $request): JsonResponse {
        return ApiResponse::success($this->dashboard->stats($request->user()));
    }
}