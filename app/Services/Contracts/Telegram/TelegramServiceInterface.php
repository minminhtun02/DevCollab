<?php

namespace App\Services\Contracts\Telegram;

use App\Models\User;

interface TelegramServiceInterface
{
    public function createLinkToken(User $user): array;

    public function sendTest(User $user): void;

    public function updateSettings(User $user, array $settings): User;

    public function disconnect(User $user): User;

    public function handleWebhook(array $payload): void;
}
