<?php

namespace App\Services\Company;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use App\Models\User;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Repositories\Contracts\JobApplicationRepositoryInterface;
use App\Services\Contracts\Company\CompanyJobApplicationServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CompanyJobApplicationService implements CompanyJobApplicationServiceInterface
{
    public function __construct(
        private CompanyProfileRepositoryInterface $profiles,
        private JobApplicationRepositoryInterface $applications,
    ) {
    }

    public function index(User $user, Request $request): LengthAwarePaginator
    {
        $profile = $this->getProfileOrFail($user);

        return $this->applications->paginateForCompany($profile->id, $request);
    }

    public function show(User $user, JobApplication $jobApplication): JobApplication
    {
        $this->assertOwnership($user, $jobApplication);

        return $jobApplication->load(['user', 'job']);
    }

    public function updateStatus(User $user, JobApplication $jobApplication, string $status, ?string $notes = null): JobApplication
    {
        $this->assertOwnership($user, $jobApplication);

        return $this->applications->update($jobApplication, [
            'status' => JobApplicationStatus::from($status),
            'company_notes' => $notes ?? $jobApplication->company_notes,
        ]);
    }

    public function sendInterviewAcknowledgment(User $user, JobApplication $jobApplication): JobApplication
    {
        $this->assertOwnership($user, $jobApplication);

        return $this->applications->update($jobApplication, [
            'status' => JobApplicationStatus::Interview,
        ]);
    }

    private function getProfileOrFail(User $user): \App\Models\CompanyProfile
    {
        $profile = $this->profiles->findByUserId($user->id);

        if (! $profile) {
            throw ValidationException::withMessages(['profile' => ['Company profile not found.']]);
        }

        return $profile;
    }

    private function assertOwnership(User $user, JobApplication $jobApplication): void
    {
        $profile = $this->getProfileOrFail($user);
        $jobApplication->loadMissing('job');

        if ($jobApplication->job->company_profile_id !== $profile->id) {
            throw ValidationException::withMessages(['job_application' => ['Unauthorized.']]);
        }
    }
}
