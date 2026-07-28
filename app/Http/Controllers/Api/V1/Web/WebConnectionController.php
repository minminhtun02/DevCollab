<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ConnectionResource;
use App\Models\Connection;
use App\Services\Contracts\Web\WebConnectionServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebConnectionController extends Controller
{
    public function __construct(private WebConnectionServiceInterface $connections)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->connections->index($request->user(), $request),
            ConnectionResource::class,
        );
    }

    public function show(Request $request, Connection $connection): JsonResponse
    {
        return ApiResponse::success(
            new ConnectionResource($this->connections->show($request->user(), $connection))
        );
    }

    public function destroy(Request $request, Connection $connection): JsonResponse
    {
        $this->connections->destroy($request->user(), $connection);

        return ApiResponse::success(null, 'Connection removed.');
    }
}
