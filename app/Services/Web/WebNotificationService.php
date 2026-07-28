<?php

namespace App\Services\Web;

use App\Models\User;
use App\Services\Contracts\Web\WebNotificationServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Validation\ValidationException;

class WebNotificationService implements WebNotificationServiceInterface
{
    public function index(User $user, Request $request): LengthAwarePaginator
    {
        $perPage = min(max((int) $request->query('per_page', 15), 1), 100);

        return $user->notifications()->paginate($perPage)->withQueryString();
    }

    public function show(User $user, string $notificationId): DatabaseNotification
    {
        $notification = $user->notifications()->where('id', $notificationId)->first();

        if (! $notification) {
            throw ValidationException::withMessages(['notification' => ['Notification not found.']]);
        }

        return $notification;
    }

    public function unreadCount(User $user): int
    {
        return $user->unreadNotifications()->count();
    }

    public function markAsRead(User $user, string $notificationId): DatabaseNotification
    {
        $notification = $this->show($user, $notificationId);
        $notification->markAsRead();

        return $notification->fresh();
    }

    public function markAllAsRead(User $user): void
    {
        $user->unreadNotifications->markAsRead();
    }
}
