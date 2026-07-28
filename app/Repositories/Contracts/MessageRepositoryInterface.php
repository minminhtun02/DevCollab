<?php

namespace App\Repositories\Contracts;

use App\Models\Conversation;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface MessageRepositoryInterface extends RepositoryInterface
{
    public function paginateForConversation(Conversation $conversation, Request $request): LengthAwarePaginator;
}
