<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\AdminLogResource;
use App\Models\AdminLog;
use App\Services\Contracts\Admin\AdminLogServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminLogController extends Controller {
    public function __construct(private AdminLogServiceInterface $logs) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->logs->paginate($request), AdminLogResource::class);
    }
    public function show(AdminLog $adminLog): JsonResponse {
        return ApiResponse::success(new AdminLogResource($this->logs->show($adminLog)));
    }
}