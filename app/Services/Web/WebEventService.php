<?php

namespace App\Services\Web;

use App\Models\Event;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Services\Contracts\Web\WebEventServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WebEventService implements WebEventServiceInterface
{
    public function __construct(private EventRepositoryInterface $events)
    {
    }

    public function index(Request $request): LengthAwarePaginator
    {
        return $this->events->paginateActive($request);
    }

    public function show(Event $event): Event
    {
        if (! $event->is_active) {
            throw ValidationException::withMessages(['event' => ['Event is not available.']]);
        }

        return $event->load('creator');
    }
}
