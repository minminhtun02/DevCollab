<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Notifications\AdminBroadcastNotification;
use App\Services\Contracts\Admin\AdminLogServiceInterface;
use App\Services\Contracts\Admin\AdminNotificationServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Notification;

class AdminNotificationService implements AdminNotificationServiceInterface
{
    public function __construct(private AdminLogServiceInterface $adminLogs)
    {
    }

    public function index(Request $request): LengthAwarePaginator
    {
        $perPage = min(max((int) $request->query('per_page', 15), 1), 100);

        return DatabaseNotification::query()
            ->where('type', AdminBroadcastNotification::class)
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function broadcast(User $admin, array $data): int
    {
        $query = User::query()->where('status', 'active');

        if (! empty($data['role'])) {
            $query->where('role', $data['role']);
        }

        $users = $query->get();
        $count = $users->count();

        Notification::send($users, new AdminBroadcastNotification(
            $data['title'],
            $data['body'],
        ));

        $this->adminLogs->record($admin, 'notification.broadcast', null, null, [
            'title' => $data['title'],
            'recipients' => $count,
        ]);

        return $count;
    }
}
