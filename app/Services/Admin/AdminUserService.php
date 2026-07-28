<?php

namespace App\Services\Admin;

use App\Enums\UserStatus;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\Admin\AdminLogServiceInterface;
use App\Services\Contracts\Admin\AdminUserServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class AdminUserService implements AdminUserServiceInterface
{
    public function __construct(
        private UserRepositoryInterface $users,
        private AdminLogServiceInterface $adminLogs,
    ) {
    }

    public function paginate(Request $request): LengthAwarePaginator
    {
        return $this->users->paginateForAdmin($request);
    }

    public function show(User $user): User
    {
        return $user->load(['developerProfile', 'companyProfile']);
    }

    public function update(User $user, array $data): User
    {
        return $this->users->update($user, $data);
    }

    public function ban(User $admin, User $user, ?string $reason = null): User
    {
        $user = $this->users->update($user, [
            'status' => UserStatus::Banned,
            'banned_at' => now(),
            'ban_reason' => $reason,
        ]);

        $user->tokens()->delete();

        $this->adminLogs->record($admin, 'user.ban', User::class, $user->id, ['reason' => $reason]);

        return $user;
    }

    public function unban(User $admin, User $user): User
    {
        $user = $this->users->update($user, [
            'status' => UserStatus::Active,
            'banned_at' => null,
            'ban_reason' => null,
        ]);

        $this->adminLogs->record($admin, 'user.unban', User::class, $user->id);

        return $user;
    }

    public function destroy(User $user): void
    {
        $user->tokens()->delete();
        $this->users->delete($user);
    }
}
