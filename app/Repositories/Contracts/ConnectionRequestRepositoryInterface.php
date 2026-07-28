<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface ConnectionRequestRepositoryInterface extends RepositoryInterface
{
    public function paginateReceived(User $user, Request $request): LengthAwarePaginator;

    public function paginateSent(User $user, Request $request): LengthAwarePaginator;

    public function paginateForAdmin(Request $request): LengthAwarePaginator;

    public function findPendingBetween(int $senderId, int $receiverId): ?\App\Models\ConnectionRequest;
}
