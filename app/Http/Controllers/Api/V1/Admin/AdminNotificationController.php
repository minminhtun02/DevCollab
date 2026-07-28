<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\BroadcastNotificationRequest;
use App\Http\Resources\Api\V1\NotificationResource;
use App\Services\Contracts\Admin\AdminNotificationServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminNotificationController extends Controller {
    public function __construct(private AdminNotificationServiceInterface $notifications) {}
    public function index(Request $request): JsonResponse {
        $paginator = $this->notifications->index($request);
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
    public function broadcast(BroadcastNotificationRequest $request): JsonResponse {
        $count = $this->notifications->broadcast($request->user(), $request->validated());
        return ApiResponse::success(['recipients' => $count], 'Notification broadcast sent.');
    }
}