<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\ReorderEventsRequest;
use App\Http\Requests\Api\V1\Admin\StoreEventRequest;
use App\Http\Requests\Api\V1\Admin\UpdateEventRequest;
use App\Http\Resources\Api\V1\EventResource;
use App\Models\Event;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminEventController extends Controller {
    public function __construct(private EventRepositoryInterface $events) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->events->paginateForAdmin($request), EventResource::class);
    }
    public function reorder(ReorderEventsRequest $request): JsonResponse {
        foreach ($request->validated('event_ids') as $order => $eventId) {
            Event::query()->whereKey($eventId)->update(['sort_order' => $order + 1]);
        }
        return ApiResponse::success(null, 'Events reordered.');
    }
    public function store(StoreEventRequest $request): JsonResponse {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;
        return ApiResponse::success(new EventResource($this->events->create($data)), 'Event created.', 201);
    }
    public function show(Event $event): JsonResponse {
        return ApiResponse::success(new EventResource($event->load('creator')));
    }
    public function update(UpdateEventRequest $request, Event $event): JsonResponse {
        return ApiResponse::success(new EventResource($this->events->update($event, $request->validated())), 'Event updated.');
    }
    public function destroy(Event $event): JsonResponse {
        $this->events->delete($event);
        return ApiResponse::success(null, 'Event deleted.');
    }
}