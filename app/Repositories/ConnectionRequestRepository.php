<?php

namespace App\Repositories;

use App\Enums\ConnectionRequestStatus;
use App\Models\ConnectionRequest;
use App\Models\User;
use App\Repositories\Contracts\ConnectionRequestRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class ConnectionRequestRepository extends BaseRepository implements ConnectionRequestRepositoryInterface
{
    public function __construct(ConnectionRequest $model)
    {
        parent::__construct($model);
    }

    public function paginateReceived(User $user, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('receiver_id', $user->id)
            ->with(['sender', 'receiver']);

        Utility::applySort($query, $request, ['status', 'created_at']);

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return Utility::applyPagination($query, $request);
    }

    public function paginateSent(User $user, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('sender_id', $user->id)
            ->with(['sender', 'receiver']);

        Utility::applySort($query, $request, ['status', 'created_at']);

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return Utility::applyPagination($query, $request);
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['sender', 'receiver']);
        Utility::applySort($query, $request, ['status', 'created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function findPendingBetween(int $senderId, int $receiverId): ?ConnectionRequest
    {
        return $this->model->newQuery()
            ->where('sender_id', $senderId)
            ->where('receiver_id', $receiverId)
            ->where('status', ConnectionRequestStatus::Pending)
            ->first();
    }
}
