<?php

namespace App\Services\Contracts\Admin;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface AdminUserServiceInterface
{
    public function paginate(Request $request): LengthAwarePaginator;

    public function show(User $user): User;

    public function update(User $user, array $data): User;

    public function ban(User $admin, User $user, ?string $reason = null): User;

    public function unban(User $admin, User $user): User;

    public function destroy(User $user): void;
}
