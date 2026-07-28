<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ConnectionResource;
use App\Models\Connection;
use App\Repositories\Contracts\ConnectionRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminConnectionController extends Controller {
    public function __construct(private ConnectionRepositoryInterface $connections) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->connections->paginateForAdmin($request), ConnectionResource::class);
    }
    public function show(Connection $connection): JsonResponse {
        return ApiResponse::success(new ConnectionResource($connection->load(['userOne', 'userTwo', 'conversation'])));
    }
    public function destroy(Connection $connection): JsonResponse {
        $this->connections->delete($connection);
        return ApiResponse::success(null, 'Connection deleted.');
    }
}