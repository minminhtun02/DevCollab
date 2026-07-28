<?php

namespace App\Services\Contracts\Admin;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface AdminNotificationServiceInterface
{
    public function index(Request $request): LengthAwarePaginator;

    public function broadcast(User $admin, array $data): int;
}
