<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface BlockRepositoryInterface extends RepositoryInterface
{
    public function paginateForUser(User $user, Request $request): LengthAwarePaginator;

    public function findBlock(User $blocker, User $blocked): ?\App\Models\Block;

    public function isBlocked(User $userOne, User $userTwo): bool;
}
