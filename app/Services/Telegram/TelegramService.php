<?php

namespace App\Services\Telegram;

use App\Models\User;
use App\Repositories\Contracts\TelegramLinkTokenRepositoryInterface;
use App\Repositories\Contracts\TelegramLogRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\Telegram\TelegramServiceInterface;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class TelegramService implements TelegramServiceInterface
{
    public function __construct(
        private TelegramLinkTokenRepositoryInterface $linkTokens,
        private TelegramLogRepositoryInterface $logs,
        private UserRepositoryInterface $users,
    ) {
    }

    public function createLinkToken(User $user): array
    {
        $this->linkTokens->deleteForUser($user);

        $token = Str::random(64);

        $linkToken = $this->linkTokens->create([
            'user_id' => $user->id,
            'token' => $token,
            'expires_at' => now()->addHours(24),
        ]);

        return [
            'token' => $linkToken->token,
            'expires_at' => $linkToken->expires_at,
        ];
    }

    public function sendTest(User $user): void
    {
        if (! $user->telegram_chat_id) {
            throw ValidationException::withMessages([
                'telegram' => ['Telegram account is not linked.'],
            ]);
        }

        $this->logs->create([
            'user_id' => $user->id,
            'type' => 'test',
            'payload' => ['message' => 'Test notification from DevCollab'],
            'status' => 'sent',
            'sent_at' => now(),
        ]);
    }

    public function updateSettings(User $user, array $settings): User
    {
        $current = $user->telegram_settings ?? [];

        return $this->users->update($user, [
            'telegram_settings' => array_merge($current, $settings),
        ]);
    }

    public function disconnect(User $user): User
    {
        $this->linkTokens->deleteForUser($user);

        return $this->users->update($user, [
            'telegram_chat_id' => null,
            'telegram_username' => null,
            'telegram_settings' => null,
        ]);
    }

    public function handleWebhook(array $payload): void
    {
        $message = $payload['message'] ?? null;

        if (! $message) {
            return;
        }

        $chatId = $message['chat']['id'] ?? null;
        $text = trim((string) ($message['text'] ?? ''));

        if (! $chatId || ! str_starts_with($text, '/start ')) {
            return;
        }

        $token = trim(substr($text, 7));
        $linkToken = $this->linkTokens->findValidToken($token);

        if (! $linkToken) {
            $this->logs->create([
                'type' => 'link_failed',
                'payload' => ['chat_id' => $chatId, 'token' => $token],
                'status' => 'failed',
                'sent_at' => now(),
            ]);

            return;
        }

        $user = $linkToken->user;

        $this->users->update($user, [
            'telegram_chat_id' => (string) $chatId,
            'telegram_username' => $message['from']['username'] ?? null,
        ]);

        $this->linkTokens->delete($linkToken);

        $this->logs->create([
            'user_id' => $user->id,
            'type' => 'link_success',
            'payload' => ['chat_id' => $chatId],
            'status' => 'sent',
            'sent_at' => now(),
        ]);
    }
}
