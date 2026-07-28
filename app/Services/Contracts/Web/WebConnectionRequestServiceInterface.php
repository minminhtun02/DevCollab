<?php

namespace App\Services\Contracts\Web;

use App\Models\ConnectionRequest;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebConnectionRequestServiceInterface
{
    public function store(User $sender, array $data): ConnectionRequest;

    public function received(User $user, Request $request): LengthAwarePaginator;

    public function sent(User $user, Request $request): LengthAwarePaginator;

    public function accept(User $user, ConnectionRequest $connectionRequest): ConnectionRequest;

    public function reject(User $user, ConnectionRequest $connectionRequest): ConnectionRequest;

    public function cancel(User $user, ConnectionRequest $connectionRequest): ConnectionRequest;
}
