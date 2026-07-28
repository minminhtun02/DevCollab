<?php

namespace App\Repositories;

use App\Models\Conversation;
use App\Models\Message;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class MessageRepository extends BaseRepository implements MessageRepositoryInterface
{
    public function __construct(Message $model)
    {
        parent::__construct($model);
    }

    public function paginateForConversation(Conversation $conversation, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('conversation_id', $conversation->id)
            ->with('user');

        Utility::applySort($query, $request, ['created_at'], 'created_at', 'asc');

        return Utility::applyPagination($query, $request);
    }
}
