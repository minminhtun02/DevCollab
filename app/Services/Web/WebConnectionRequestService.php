<?php

namespace App\Services\Web;

use App\Enums\ConnectionRequestStatus;
use App\Models\Connection;
use App\Models\ConnectionRequest;
use App\Models\Conversation;
use App\Models\User;
use App\Repositories\Contracts\BlockRepositoryInterface;
use App\Repositories\Contracts\ConnectionRepositoryInterface;
use App\Repositories\Contracts\ConnectionRequestRepositoryInterface;
use App\Services\Contracts\Web\WebConnectionRequestServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class WebConnectionRequestService implements WebConnectionRequestServiceInterface
{
    public function __construct(
        private ConnectionRequestRepositoryInterface $requests,
        private ConnectionRepositoryInterface $connections,
        private BlockRepositoryInterface $blocks,
    ) {
    }

    public function store(User $sender, array $data): ConnectionRequest
    {
        $receiverId = (int) $data['receiver_id'];

        if ($sender->id === $receiverId) {
            throw ValidationException::withMessages(['receiver_id' => ['You cannot connect with yourself.']]);
        }

        $receiver = User::query()->findOrFail($receiverId);

        if ($this->blocks->isBlocked($sender, $receiver)) {
            throw ValidationException::withMessages(['receiver_id' => ['Unable to send connection request.']]);
        }

        if ($this->connections->findBetweenUsers($sender->id, $receiverId)) {
            throw ValidationException::withMessages(['receiver_id' => ['You are already connected.']]);
        }

        if ($this->requests->findPendingBetween($sender->id, $receiverId)
            || $this->requests->findPendingBetween($receiverId, $sender->id)) {
            throw ValidationException::withMessages(['receiver_id' => ['A pending request already exists.']]);
        }

        return $this->requests->create([
            'sender_id' => $sender->id,
            'receiver_id' => $receiverId,
            'message' => $data['message'] ?? null,
            'status' => ConnectionRequestStatus::Pending,
        ])->load(['sender', 'receiver']);
    }

    public function received(User $user, Request $request): LengthAwarePaginator
    {
        return $this->requests->paginateReceived($user, $request);
    }

    public function sent(User $user, Request $request): LengthAwarePaginator
    {
        return $this->requests->paginateSent($user, $request);
    }

    public function accept(User $user, ConnectionRequest $connectionRequest): ConnectionRequest
    {
        $this->assertReceiver($user, $connectionRequest);
        $this->assertPending($connectionRequest);

        return DB::transaction(function () use ($connectionRequest, $user) {
            $connectionRequest = $this->requests->update($connectionRequest, [
                'status' => ConnectionRequestStatus::Accepted,
            ]);

            $userOneId = min($connectionRequest->sender_id, $connectionRequest->receiver_id);
            $userTwoId = max($connectionRequest->sender_id, $connectionRequest->receiver_id);

            $connection = $this->connections->create([
                'user_one_id' => $userOneId,
                'user_two_id' => $userTwoId,
            ]);

            $conversation = Conversation::query()->create([
                'connection_id' => $connection->id,
            ]);

            $conversation->users()->attach([$connectionRequest->sender_id, $connectionRequest->receiver_id]);

            return $connectionRequest->load(['sender', 'receiver']);
        });
    }

    public function reject(User $user, ConnectionRequest $connectionRequest): ConnectionRequest
    {
        $this->assertReceiver($user, $connectionRequest);
        $this->assertPending($connectionRequest);

        return $this->requests->update($connectionRequest, [
            'status' => ConnectionRequestStatus::Rejected,
        ]);
    }

    public function cancel(User $user, ConnectionRequest $connectionRequest): ConnectionRequest
    {
        if ($connectionRequest->sender_id !== $user->id) {
            throw ValidationException::withMessages(['connection_request' => ['Unauthorized.']]);
        }

        $this->assertPending($connectionRequest);

        return $this->requests->update($connectionRequest, [
            'status' => ConnectionRequestStatus::Cancelled,
        ]);
    }

    private function assertReceiver(User $user, ConnectionRequest $connectionRequest): void
    {
        if ($connectionRequest->receiver_id !== $user->id) {
            throw ValidationException::withMessages(['connection_request' => ['Unauthorized.']]);
        }
    }

    private function assertPending(ConnectionRequest $connectionRequest): void
    {
        if ($connectionRequest->status !== ConnectionRequestStatus::Pending) {
            throw ValidationException::withMessages(['connection_request' => ['Request is no longer pending.']]);
        }
    }
}
