<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\EventResource;
use App\Models\Event;
use App\Services\Contracts\Web\WebEventServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebEventController extends Controller
{
    public function __construct(private WebEventServiceInterface $events)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return ApiResponse::withPagination($this->events->index($request), EventResource::class);
    }

    public function show(Event $event): JsonResponse
    {
        return ApiResponse::success(new EventResource($this->events->show($event)));
    }
}
