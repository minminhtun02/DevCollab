<?php

namespace App\Services\Contracts\Web;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebBlockServiceInterface
{
    public function block(User $blocker, User $blocked): void;

    public function unblock(User $blocker, User $blocked): void;

    public function index(User $user, Request $request): LengthAwarePaginator;
}
