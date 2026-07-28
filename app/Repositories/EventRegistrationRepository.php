<?php

namespace App\Repositories;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\User;
use App\Repositories\Contracts\EventRegistrationRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class EventRegistrationRepository extends BaseRepository implements EventRegistrationRepositoryInterface
{
    public function __construct(EventRegistration $model)
    {
        parent::__construct($model);
    }

    public function paginateForEvent(Event $event, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('event_id', $event->id)
            ->with('user');

        Utility::applySort($query, $request, ['status', 'created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function findForEventAndUser(Event $event, User $user): ?EventRegistration
    {
        return $this->model->newQuery()
            ->where('event_id', $event->id)
            ->where('user_id', $user->id)
            ->first();
    }

    public function paginateForAdmin(Event $event, Request $request): LengthAwarePaginator
    {
        return $this->paginateForEvent($event, $request);
    }
}
