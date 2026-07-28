<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\StoreEventRegistrationRequest;
use App\Http\Resources\Api\V1\EventRegistrationResource;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Services\Contracts\Web\WebEventRegistrationServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebEventRegistrationController extends Controller
{
    public function __construct(private WebEventRegistrationServiceInterface $registrations)
    {
    }

    public function index(Request $request, Event $event): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->registrations->index($event, $request),
            EventRegistrationResource::class,
        );
    }

    public function store(StoreEventRegistrationRequest $request, Event $event): JsonResponse
    {
        $registration = $this->registrations->store($request->user(), $event, $request->validated());

        return ApiResponse::success(new EventRegistrationResource($registration), 'Registration submitted.', 201);
    }

    public function accept(Request $request, Event $event, EventRegistration $eventRegistration): JsonResponse
    {
        return ApiResponse::success(
            new EventRegistrationResource($this->registrations->accept($request->user(), $event, $eventRegistration)),
            'Registration accepted.',
        );
    }

    public function reject(Request $request, Event $event, EventRegistration $eventRegistration): JsonResponse
    {
        return ApiResponse::success(
            new EventRegistrationResource($this->registrations->reject($request->user(), $event, $eventRegistration)),
            'Registration rejected.',
        );
    }
}
