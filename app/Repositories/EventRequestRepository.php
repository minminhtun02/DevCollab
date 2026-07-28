<?php

namespace App\Repositories;

use App\Models\EventRequest;
use App\Models\User;
use App\Repositories\Contracts\EventRequestRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class EventRequestRepository extends BaseRepository implements EventRequestRepositoryInterface
{
    public function __construct(EventRequest $model)
    {
        parent::__construct($model);
    }

    public function paginateForUser(User $user, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->where('user_id', $user->id);
        Utility::applySort($query, $request, ['status', 'preferred_date', 'created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['user', 'reviewer']);
        Utility::applySearch($query, $request, ['title', 'location']);
        Utility::applySort($query, $request, ['status', 'preferred_date', 'created_at']);

        return Utility::applyPagination($query, $request);
    }
}
