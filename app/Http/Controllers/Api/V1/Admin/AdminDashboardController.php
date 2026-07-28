<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Services\Contracts\Admin\AdminDashboardServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
class AdminDashboardController extends Controller {
    public function __construct(private AdminDashboardServiceInterface $dashboard) {}
    public function stats(): JsonResponse { return ApiResponse::success($this->dashboard->stats()); }
    public function userGrowth(): JsonResponse { return ApiResponse::success($this->dashboard->userGrowth()); }
    public function activity(): JsonResponse { return ApiResponse::success($this->dashboard->activity()); }
    public function charts(): JsonResponse { return ApiResponse::success($this->dashboard->charts()); }
}