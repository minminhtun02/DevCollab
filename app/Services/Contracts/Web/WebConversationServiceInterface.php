<?php

namespace App\Services\Contracts\Web;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebConversationServiceInterface
{
    public function index(User $user, Request $request): LengthAwarePaginator;

    public function show(User $user, Conversation $conversation): Conversation;

    public function pin(User $user, Conversation $conversation): Conversation;

    public function unpin(User $user, Conversation $conversation): Conversation;

    public function mute(User $user, Conversation $conversation, ?int $hours = null): Conversation;

    public function unmute(User $user, Conversation $conversation): Conversation;

    public function destroy(User $user, Conversation $conversation): void;

    public function reorderPinned(User $user, array $conversationIds): void;
}
