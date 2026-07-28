<?php

namespace App\Services\Web;

use App\Enums\EventRequestStatus;
use App\Models\EventRequest;
use App\Models\User;
use App\Repositories\Contracts\EventRequestRepositoryInterface;
use App\Services\Contracts\Web\WebEventRequestServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class WebEventRequestService implements WebEventRequestServiceInterface
{
    public function __construct(private EventRequestRepositoryInterface $eventRequests)
    {
    }

    public function index(User $user, Request $request): LengthAwarePaginator
    {
        return $this->eventRequests->paginateForUser($user, $request);
    }

    public function store(User $user, array $data): EventRequest
    {
        return $this->eventRequests->create(array_merge($data, [
            'user_id' => $user->id,
            'status' => EventRequestStatus::Pending,
        ]));
    }
}
