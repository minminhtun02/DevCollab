<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\StoreConnectionRequestRequest;
use App\Http\Resources\Api\V1\ConnectionRequestResource;
use App\Models\ConnectionRequest;
use App\Services\Contracts\Web\WebConnectionRequestServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebConnectionRequestController extends Controller
{
    public function __construct(private WebConnectionRequestServiceInterface $connectionRequests)
    {
    }

    public function store(StoreConnectionRequestRequest $request): JsonResponse
    {
        $item = $this->connectionRequests->store($request->user(), $request->validated());

        return ApiResponse::success(new ConnectionRequestResource($item), 'Connection request sent.', 201);
    }

    public function received(Request $request): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->connectionRequests->received($request->user(), $request),
            ConnectionRequestResource::class,
        );
    }

    public function sent(Request $request): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->connectionRequests->sent($request->user(), $request),
            ConnectionRequestResource::class,
        );
    }

    public function accept(Request $request, ConnectionRequest $connectionRequest): JsonResponse
    {
        return ApiResponse::success(
            new ConnectionRequestResource($this->connectionRequests->accept($request->user(), $connectionRequest)),
            'Connection request accepted.',
        );
    }

    public function reject(Request $request, ConnectionRequest $connectionRequest): JsonResponse
    {
        return ApiResponse::success(
            new ConnectionRequestResource($this->connectionRequests->reject($request->user(), $connectionRequest)),
            'Connection request rejected.',
        );
    }

    public function cancel(Request $request, ConnectionRequest $connectionRequest): JsonResponse
    {
        return ApiResponse::success(
            new ConnectionRequestResource($this->connectionRequests->cancel($request->user(), $connectionRequest)),
            'Connection request cancelled.',
        );
    }
}
