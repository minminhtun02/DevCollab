<?php

namespace App\Services\Contracts\Admin;

use App\Models\AdminLog;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface AdminLogServiceInterface
{
    public function paginate(Request $request): LengthAwarePaginator;

    public function show(AdminLog $adminLog): AdminLog;

    public function record(User $admin, string $action, ?string $subjectType = null, ?int $subjectId = null, ?array $metadata = null): AdminLog;
}
