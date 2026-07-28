<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface EventRequestRepositoryInterface extends RepositoryInterface
{
    public function paginateForUser(User $user, Request $request): LengthAwarePaginator;

    public function paginateForAdmin(Request $request): LengthAwarePaginator;
}
