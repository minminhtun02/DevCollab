<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ConnectionRequestResource;
use App\Repositories\Contracts\ConnectionRequestRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminConnectionRequestController extends Controller {
    public function __construct(private ConnectionRequestRepositoryInterface $connectionRequests) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->connectionRequests->paginateForAdmin($request), ConnectionRequestResource::class);
    }
}