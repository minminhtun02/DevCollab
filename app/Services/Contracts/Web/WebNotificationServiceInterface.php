<?php

namespace App\Services\Contracts\Web;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

interface WebNotificationServiceInterface
{
    public function index(User $user, Request $request): LengthAwarePaginator;

    public function show(User $user, string $notificationId): DatabaseNotification;

    public function unreadCount(User $user): int;

    public function markAsRead(User $user, string $notificationId): DatabaseNotification;

    public function markAllAsRead(User $user): void;
}
