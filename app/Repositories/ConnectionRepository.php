<?php

namespace App\Repositories;

use App\Models\Connection;
use App\Models\User;
use App\Repositories\Contracts\ConnectionRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class ConnectionRepository extends BaseRepository implements ConnectionRepositoryInterface
{
    public function __construct(Connection $model)
    {
        parent::__construct($model);
    }

    public function paginateForUser(User $user, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where(fn ($q) => $q->where('user_one_id', $user->id)->orWhere('user_two_id', $user->id))
            ->with(['userOne', 'userTwo', 'conversation']);

        Utility::applySort($query, $request, ['created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['userOne', 'userTwo']);
        Utility::applySort($query, $request, ['created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function findBetweenUsers(int $userOneId, int $userTwoId): ?Connection
    {
        return $this->model->newQuery()
            ->where(function ($q) use ($userOneId, $userTwoId) {
                $q->where('user_one_id', $userOneId)->where('user_two_id', $userTwoId);
            })
            ->orWhere(function ($q) use ($userOneId, $userTwoId) {
                $q->where('user_one_id', $userTwoId)->where('user_two_id', $userOneId);
            })
            ->first();
    }
}
