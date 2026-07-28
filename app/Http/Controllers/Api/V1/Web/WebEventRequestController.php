<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\StoreEventRequestRequest;
use App\Http\Resources\Api\V1\EventRequestResource;
use App\Services\Contracts\Web\WebEventRequestServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebEventRequestController extends Controller
{
    public function __construct(private WebEventRequestServiceInterface $eventRequests)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->eventRequests->index($request->user(), $request),
            EventRequestResource::class,
        );
    }

    public function store(StoreEventRequestRequest $request): JsonResponse
    {
        $item = $this->eventRequests->store($request->user(), $request->validated());

        return ApiResponse::success(new EventRequestResource($item), 'Event request submitted.', 201);
    }
}
