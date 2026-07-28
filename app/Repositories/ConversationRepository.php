<?php

namespace App\Repositories;

use App\Models\Conversation;
use App\Models\User;
use App\Repositories\Contracts\ConversationRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class ConversationRepository extends BaseRepository implements ConversationRepositoryInterface
{
    public function __construct(Conversation $model)
    {
        parent::__construct($model);
    }

    public function paginateForUser(User $user, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->whereHas('users', fn ($q) => $q->where('users.id', $user->id))
            ->with(['connection.userOne', 'connection.userTwo', 'users'])
            ->orderByDesc('last_message_at');

        return Utility::applyPagination($query, $request);
    }

    public function findForUser(User $user, int $conversationId): ?Conversation
    {
        return $this->model->newQuery()
            ->whereHas('users', fn ($q) => $q->where('users.id', $user->id))
            ->with(['connection.userOne', 'connection.userTwo', 'users'])
            ->find($conversationId);
    }
}
