<?php

namespace App\Services\Admin;

use App\Models\AdminLog;
use App\Models\User;
use App\Repositories\Contracts\AdminLogRepositoryInterface;
use App\Services\Contracts\Admin\AdminLogServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class AdminLogService implements AdminLogServiceInterface
{
    public function __construct(private AdminLogRepositoryInterface $logs)
    {
    }

    public function paginate(Request $request): LengthAwarePaginator
    {
        return $this->logs->paginate($request);
    }

    public function show(AdminLog $adminLog): AdminLog
    {
        return $adminLog->load('admin');
    }

    public function record(User $admin, string $action, ?string $subjectType = null, ?int $subjectId = null, ?array $metadata = null): AdminLog
    {
        return $this->logs->create([
            'admin_id' => $admin->id,
            'action' => $action,
            'subject_type' => $subjectType,
            'subject_id' => $subjectId,
            'metadata' => $metadata,
        ]);
    }
}
