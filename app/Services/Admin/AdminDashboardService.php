<?php

namespace App\Services\Admin;

use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\Connection;
use App\Models\Event;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\Report;
use App\Models\User;
use App\Services\Contracts\Admin\AdminDashboardServiceInterface;
use Illuminate\Support\Facades\DB;

class AdminDashboardService implements AdminDashboardServiceInterface
{
    public function stats(): array
    {
        return [
            'users' => User::query()->count(),
            'developers' => User::query()->where('role', UserRole::Developer)->count(),
            'companies' => User::query()->where('role', UserRole::Company)->count(),
            'jobs' => Job::query()->count(),
            'job_applications' => JobApplication::query()->count(),
            'connections' => Connection::query()->count(),
            'events' => Event::query()->count(),
            'pending_reports' => Report::query()->where('status', ReportStatus::Pending)->count(),
        ];
    }

    public function userGrowth(): array
    {
        return User::query()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->all();
    }

    public function activity(): array
    {
        return [
            'recent_users' => User::query()->latest()->limit(5)->get(['id', 'name', 'email', 'role', 'created_at']),
            'recent_applications' => JobApplication::query()
                ->with(['user:id,name', 'job:id,title'])
                ->latest()
                ->limit(5)
                ->get(),
            'pending_reports' => Report::query()
                ->with(['reporter:id,name', 'reportedUser:id,name'])
                ->where('status', ReportStatus::Pending)
                ->latest()
                ->limit(5)
                ->get(),
        ];
    }

    public function charts(): array
    {
        return [
            'applications_by_status' => JobApplication::query()
                ->select('status', DB::raw('count(*) as total'))
                ->groupBy('status')
                ->pluck('total', 'status'),
            'users_by_role' => User::query()
                ->select('role', DB::raw('count(*) as total'))
                ->groupBy('role')
                ->pluck('total', 'role'),
        ];
    }
}
