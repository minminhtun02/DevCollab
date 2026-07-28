<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\NotificationResource;
use App\Services\Contracts\Web\WebNotificationServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebNotificationController extends Controller
{
    public function __construct(private WebNotificationServiceInterface $notifications)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $paginator = $this->notifications->index($request->user(), $request);

        return response()->json([
            'success' => true,
            'message' => 'Success',
            'data' => NotificationResource::collection($paginator->items()),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
        ]);
    }

    public function unreadCount(Request $request): JsonResponse
    {
        return ApiResponse::success(['count' => $this->notifications->unreadCount($request->user())]);
    }

    public function show(Request $request, string $notification): JsonResponse
    {
        return ApiResponse::success(
            new NotificationResource($this->notifications->show($request->user(), $notification))
        );
    }

    public function markAsRead(Request $request, string $notification): JsonResponse
    {
        return ApiResponse::success(
            new NotificationResource($this->notifications->markAsRead($request->user(), $notification))
        );
    }

    public function markAllAsRead(Request $request): JsonResponse
    {
        $this->notifications->markAllAsRead($request->user());

        return ApiResponse::success(null, 'All notifications marked as read.');
    }
}
