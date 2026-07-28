<?php

namespace App\Services\Web;

use App\Models\User;
use App\Repositories\Contracts\BlockRepositoryInterface;
use App\Services\Contracts\Web\WebBlockServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WebBlockService implements WebBlockServiceInterface
{
    public function __construct(private BlockRepositoryInterface $blocks)
    {
    }

    public function block(User $blocker, User $blocked): void
    {
        if ($blocker->id === $blocked->id) {
            throw ValidationException::withMessages(['user' => ['You cannot block yourself.']]);
        }

        if ($this->blocks->findBlock($blocker, $blocked)) {
            throw ValidationException::withMessages(['user' => ['User is already blocked.']]);
        }

        $this->blocks->create([
            'blocker_id' => $blocker->id,
            'blocked_id' => $blocked->id,
        ]);
    }

    public function unblock(User $blocker, User $blocked): void
    {
        $block = $this->blocks->findBlock($blocker, $blocked);

        if (! $block) {
            throw ValidationException::withMessages(['user' => ['User is not blocked.']]);
        }

        $this->blocks->delete($block);
    }

    public function index(User $user, Request $request): LengthAwarePaginator
    {
        return $this->blocks->paginateForUser($user, $request);
    }
}
