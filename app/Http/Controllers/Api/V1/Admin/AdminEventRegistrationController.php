<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Enums\EventRegistrationStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\EventRegistrationResource;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Repositories\Contracts\EventRegistrationRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminEventRegistrationController extends Controller {
    public function __construct(private EventRegistrationRepositoryInterface $registrations) {}
    public function index(Request $request, Event $event): JsonResponse {
        return ApiResponse::withPagination($this->registrations->paginateForAdmin($event, $request), EventRegistrationResource::class);
    }
    public function accept(Event $event, EventRegistration $eventRegistration): JsonResponse {
        abort_unless($eventRegistration->event_id === $event->id, 404);
        return ApiResponse::success(new EventRegistrationResource($this->registrations->update($eventRegistration, ['status' => EventRegistrationStatus::Accepted])), 'Registration accepted.');
    }
    public function reject(Event $event, EventRegistration $eventRegistration): JsonResponse {
        abort_unless($eventRegistration->event_id === $event->id, 404);
        return ApiResponse::success(new EventRegistrationResource($this->registrations->update($eventRegistration, ['status' => EventRegistrationStatus::Rejected])), 'Registration rejected.');
    }
}