<?php

namespace App\Repositories;

use App\Models\Block;
use App\Models\User;
use App\Repositories\Contracts\BlockRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class BlockRepository extends BaseRepository implements BlockRepositoryInterface
{
    public function __construct(Block $model)
    {
        parent::__construct($model);
    }

    public function paginateForUser(User $user, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('blocker_id', $user->id)
            ->with('blocked');

        Utility::applySort($query, $request, ['created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function findBlock(User $blocker, User $blocked): ?Block
    {
        return $this->model->newQuery()
            ->where('blocker_id', $blocker->id)
            ->where('blocked_id', $blocked->id)
            ->first();
    }

    public function isBlocked(User $userOne, User $userTwo): bool
    {
        return $this->model->newQuery()
            ->where(function ($q) use ($userOne, $userTwo) {
                $q->where('blocker_id', $userOne->id)->where('blocked_id', $userTwo->id);
            })
            ->orWhere(function ($q) use ($userOne, $userTwo) {
                $q->where('blocker_id', $userTwo->id)->where('blocked_id', $userOne->id);
            })
            ->exists();
    }
}
