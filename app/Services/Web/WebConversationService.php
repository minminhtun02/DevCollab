<?php

namespace App\Services\Web;

use App\Models\Conversation;
use App\Models\User;
use App\Repositories\Contracts\ConversationRepositoryInterface;
use App\Services\Contracts\Web\WebConversationServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WebConversationService implements WebConversationServiceInterface
{
    public function __construct(private ConversationRepositoryInterface $conversations)
    {
    }

    public function index(User $user, Request $request): LengthAwarePaginator
    {
        return $this->conversations->paginateForUser($user, $request);
    }

    public function show(User $user, Conversation $conversation): Conversation
    {
        return $this->getAuthorizedConversation($user, $conversation);
    }

    public function pin(User $user, Conversation $conversation): Conversation
    {
        $conversation = $this->getAuthorizedConversation($user, $conversation);

        $maxOrder = $user->id
            ? (int) $conversation->users()->where('users.id', $user->id)->value('pin_order')
            : 0;

        $conversation->users()->updateExistingPivot($user->id, [
            'pinned_at' => now(),
            'pin_order' => $maxOrder + 1,
        ]);

        return $conversation->fresh(['connection.userOne', 'connection.userTwo', 'users']);
    }

    public function unpin(User $user, Conversation $conversation): Conversation
    {
        $conversation = $this->getAuthorizedConversation($user, $conversation);

        $conversation->users()->updateExistingPivot($user->id, [
            'pinned_at' => null,
            'pin_order' => null,
        ]);

        return $conversation->fresh(['connection.userOne', 'connection.userTwo', 'users']);
    }

    public function mute(User $user, Conversation $conversation, ?int $hours = null): Conversation
    {
        $conversation = $this->getAuthorizedConversation($user, $conversation);

        $conversation->users()->updateExistingPivot($user->id, [
            'muted_until' => $hours ? now()->addHours($hours) : null,
        ]);

        return $conversation->fresh(['connection.userOne', 'connection.userTwo', 'users']);
    }

    public function unmute(User $user, Conversation $conversation): Conversation
    {
        $conversation = $this->getAuthorizedConversation($user, $conversation);

        $conversation->users()->updateExistingPivot($user->id, [
            'muted_until' => null,
        ]);

        return $conversation->fresh(['connection.userOne', 'connection.userTwo', 'users']);
    }

    public function destroy(User $user, Conversation $conversation): void
    {
        $this->getAuthorizedConversation($user, $conversation);

        $conversation->users()->detach($user->id);

        if ($conversation->users()->count() === 0) {
            $conversation->messages()->delete();
            $conversation->delete();
        }
    }

    public function reorderPinned(User $user, array $conversationIds): void
    {
        foreach ($conversationIds as $order => $conversationId) {
            $conversation = $this->conversations->findForUser($user, (int) $conversationId);

            if (! $conversation) {
                continue;
            }

            $conversation->users()->updateExistingPivot($user->id, [
                'pin_order' => $order + 1,
            ]);
        }
    }

    private function getAuthorizedConversation(User $user, Conversation $conversation): Conversation
    {
        $found = $this->conversations->findForUser($user, $conversation->id);

        if (! $found) {
            throw ValidationException::withMessages(['conversation' => ['Unauthorized.']]);
        }

        return $found;
    }
}
