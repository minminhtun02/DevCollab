<?php

namespace App\Services\Contracts\Web;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebMessageServiceInterface
{
    public function index(User $user, Conversation $conversation, Request $request): LengthAwarePaginator;

    public function store(User $user, Conversation $conversation, array $data): Message;

    public function update(User $user, Conversation $conversation, Message $message, array $data): Message;

    public function destroy(User $user, Conversation $conversation, Message $message): void;

    public function pin(User $user, Conversation $conversation, Message $message): Message;

    public function unpin(User $user, Conversation $conversation, Message $message): Message;

    public function markAsRead(User $user, Conversation $conversation): void;
}
