<?php

namespace App\Repositories\Contracts;

use App\Models\User;

interface TelegramLinkTokenRepositoryInterface extends RepositoryInterface
{
    public function findValidToken(string $token): ?\App\Models\TelegramLinkToken;

    public function deleteForUser(User $user): void;
}
