<?php

namespace App\Services\Web;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use App\Repositories\Contracts\ConversationRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Services\Contracts\Web\WebMessageServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WebMessageService implements WebMessageServiceInterface
{
    public function __construct(
        private ConversationRepositoryInterface $conversations,
        private MessageRepositoryInterface $messages,
    ) {
    }

    public function index(User $user, Conversation $conversation, Request $request): LengthAwarePaginator
    {
        $this->assertParticipant($user, $conversation);

        return $this->messages->paginateForConversation($conversation, $request);
    }

    public function store(User $user, Conversation $conversation, array $data): Message
    {
        $this->assertParticipant($user, $conversation);

        $message = $this->messages->create([
            'conversation_id' => $conversation->id,
            'user_id' => $user->id,
            'body' => $data['body'],
        ]);

        $conversation->update(['last_message_at' => now()]);

        return $message->load('user');
    }

    public function update(User $user, Conversation $conversation, Message $message, array $data): Message
    {
        $this->assertMessageOwnership($user, $conversation, $message);

        return $this->messages->update($message, [
            'body' => $data['body'],
            'edited_at' => now(),
        ])->load('user');
    }

    public function destroy(User $user, Conversation $conversation, Message $message): void
    {
        $this->assertMessageOwnership($user, $conversation, $message);
        $this->messages->delete($message);
    }

    public function pin(User $user, Conversation $conversation, Message $message): Message
    {
        $this->assertParticipant($user, $conversation);
        $this->assertMessageInConversation($conversation, $message);

        return $this->messages->update($message, ['is_pinned' => true])->load('user');
    }

    public function unpin(User $user, Conversation $conversation, Message $message): Message
    {
        $this->assertParticipant($user, $conversation);
        $this->assertMessageInConversation($conversation, $message);

        return $this->messages->update($message, ['is_pinned' => false])->load('user');
    }

    public function markAsRead(User $user, Conversation $conversation): void
    {
        $this->assertParticipant($user, $conversation);

        $conversation->users()->updateExistingPivot($user->id, [
            'last_read_at' => now(),
        ]);
    }

    private function assertParticipant(User $user, Conversation $conversation): void
    {
        if (! $this->conversations->findForUser($user, $conversation->id)) {
            throw ValidationException::withMessages(['conversation' => ['Unauthorized.']]);
        }
    }

    private function assertMessageOwnership(User $user, Conversation $conversation, Message $message): void
    {
        $this->assertParticipant($user, $conversation);
        $this->assertMessageInConversation($conversation, $message);

        if ($message->user_id !== $user->id) {
            throw ValidationException::withMessages(['message' => ['Unauthorized.']]);
        }
    }

    private function assertMessageInConversation(Conversation $conversation, Message $message): void
    {
        if ($message->conversation_id !== $conversation->id) {
            throw ValidationException::withMessages(['message' => ['Message does not belong to this conversation.']]);
        }
    }
}
