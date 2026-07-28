<?php

namespace App\Repositories;

use App\Models\TelegramLinkToken;
use App\Models\User;
use App\Repositories\Contracts\TelegramLinkTokenRepositoryInterface;

class TelegramLinkTokenRepository extends BaseRepository implements TelegramLinkTokenRepositoryInterface
{
    public function __construct(TelegramLinkToken $model)
    {
        parent::__construct($model);
    }

    public function findValidToken(string $token): ?TelegramLinkToken
    {
        return $this->model->newQuery()
            ->where('token', $token)
            ->where('expires_at', '>', now())
            ->first();
    }

    public function deleteForUser(User $user): void
    {
        $this->model->newQuery()->where('user_id', $user->id)->delete();
    }
}
