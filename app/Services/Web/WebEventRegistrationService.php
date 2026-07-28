<?php

namespace App\Services\Web;

use App\Enums\EventRegistrationStatus;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\User;
use App\Repositories\Contracts\EventRegistrationRepositoryInterface;
use App\Services\Contracts\Web\WebEventRegistrationServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WebEventRegistrationService implements WebEventRegistrationServiceInterface
{
    public function __construct(private EventRegistrationRepositoryInterface $registrations)
    {
    }

    public function index(Event $event, Request $request): LengthAwarePaginator
    {
        return $this->registrations->paginateForEvent($event, $request);
    }

    public function store(User $user, Event $event, array $data): EventRegistration
    {
        if (! $event->is_active) {
            throw ValidationException::withMessages(['event' => ['Event is not accepting registrations.']]);
        }

        if ($this->registrations->findForEventAndUser($event, $user)) {
            throw ValidationException::withMessages(['event' => ['You are already registered.']]);
        }

        if ($event->max_participants) {
            $count = $event->registrations()
                ->where('status', EventRegistrationStatus::Accepted)
                ->count();

            if ($count >= $event->max_participants) {
                throw ValidationException::withMessages(['event' => ['Event is full.']]);
            }
        }

        return $this->registrations->create([
            'event_id' => $event->id,
            'user_id' => $user->id,
            'notes' => $data['notes'] ?? null,
            'status' => EventRegistrationStatus::Pending,
        ])->load(['event', 'user']);
    }

    public function accept(User $user, Event $event, EventRegistration $registration): EventRegistration
    {
        $this->assertEventCreator($user, $event, $registration);

        return $this->registrations->update($registration, [
            'status' => EventRegistrationStatus::Accepted,
        ]);
    }

    public function reject(User $user, Event $event, EventRegistration $registration): EventRegistration
    {
        $this->assertEventCreator($user, $event, $registration);

        return $this->registrations->update($registration, [
            'status' => EventRegistrationStatus::Rejected,
        ]);
    }

    private function assertEventCreator(User $user, Event $event, EventRegistration $registration): void
    {
        if ($registration->event_id !== $event->id) {
            throw ValidationException::withMessages(['registration' => ['Invalid registration.']]);
        }

        if ($event->created_by !== $user->id && ! $user->isAdmin()) {
            throw ValidationException::withMessages(['registration' => ['Unauthorized.']]);
        }
    }
}
