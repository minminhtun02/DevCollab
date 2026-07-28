<?php

namespace App\Services\Company;

use App\Enums\JobApplicationStatus;
use App\Enums\JobStatus;
use App\Models\User;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Services\Contracts\Company\CompanyDashboardServiceInterface;
use Illuminate\Validation\ValidationException;

class CompanyDashboardService implements CompanyDashboardServiceInterface
{
    public function __construct(private CompanyProfileRepositoryInterface $profiles)
    {
    }

    public function stats(User $user): array
    {
        $profile = $this->profiles->findByUserId($user->id);

        if (! $profile) {
            throw ValidationException::withMessages(['profile' => ['Company profile not found.']]);
        }

        $jobs = $profile->jobs();

        return [
            'total_jobs' => (clone $jobs)->count(),
            'published_jobs' => (clone $jobs)->where('status', JobStatus::Published)->count(),
            'draft_jobs' => (clone $jobs)->where('status', JobStatus::Draft)->count(),
            'closed_jobs' => (clone $jobs)->where('status', JobStatus::Closed)->count(),
            'pending_applications' => $profile->jobs()
                ->join('job_applications', 'jobs.id', '=', 'job_applications.job_id')
                ->where('job_applications.status', JobApplicationStatus::Pending)
                ->count(),
        ];
    }
}
