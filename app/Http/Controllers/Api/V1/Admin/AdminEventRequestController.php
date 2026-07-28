<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Enums\EventRequestStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\EventRequestResource;
use App\Models\Event;
use App\Models\EventRequest;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Repositories\Contracts\EventRequestRepositoryInterface;
use App\Services\Contracts\Admin\AdminLogServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminEventRequestController extends Controller {
    public function __construct(
        private EventRequestRepositoryInterface $eventRequests,
        private EventRepositoryInterface $events,
        private AdminLogServiceInterface $adminLogs,
    ) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->eventRequests->paginateForAdmin($request), EventRequestResource::class);
    }
    public function show(EventRequest $eventRequest): JsonResponse {
        return ApiResponse::success(new EventRequestResource($eventRequest->load(['user', 'reviewer'])));
    }
    public function approve(Request $request, EventRequest $eventRequest): JsonResponse {
        $event = $this->events->create([
            'created_by' => $request->user()->id,
            'title' => $eventRequest->title,
            'description' => $eventRequest->description,
            'location' => $eventRequest->location,
            'starts_at' => $eventRequest->preferred_date ?? now()->addWeek(),
            'is_active' => true,
        ]);
        $eventRequest = $this->eventRequests->update($eventRequest, [
            'status' => EventRequestStatus::Approved,
            'reviewed_by' => $request->user()->id,
        ]);
        $this->adminLogs->record($request->user(), 'event_request.approve', EventRequest::class, $eventRequest->id, ['event_id' => $event->id]);
        return ApiResponse::success(new EventRequestResource($eventRequest), 'Event request approved.');
    }
    public function reject(Request $request, EventRequest $eventRequest): JsonResponse {
        $eventRequest = $this->eventRequests->update($eventRequest, [
            'status' => EventRequestStatus::Rejected,
            'reviewed_by' => $request->user()->id,
            'admin_notes' => $request->input('admin_notes'),
        ]);
        return ApiResponse::success(new EventRequestResource($eventRequest), 'Event request rejected.');
    }
}