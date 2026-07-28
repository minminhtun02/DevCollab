<?php

namespace App\Services\Company;

use App\Enums\JobStatus;
use App\Models\Job;
use App\Models\User;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Repositories\Contracts\JobRepositoryInterface;
use App\Services\Contracts\Company\CompanyJobServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CompanyJobService implements CompanyJobServiceInterface
{
    public function __construct(
        private CompanyProfileRepositoryInterface $profiles,
        private JobRepositoryInterface $jobs,
    ) {
    }

    public function index(User $user, Request $request): LengthAwarePaginator
    {
        $profile = $this->getProfileOrFail($user);

        return $this->jobs->paginateForCompany($profile, $request);
    }

    public function store(User $user, array $data): Job
    {
        $profile = $this->getProfileOrFail($user);

        return $this->jobs->create(array_merge($data, [
            'company_profile_id' => $profile->id,
            'status' => JobStatus::Draft,
        ]))->load(['category', 'companyProfile']);
    }

    public function show(User $user, Job $job): Job
    {
        $this->assertOwnership($user, $job);

        return $job->load(['category', 'companyProfile']);
    }

    public function update(User $user, Job $job, array $data): Job
    {
        $this->assertOwnership($user, $job);

        return $this->jobs->update($job, $data)->load(['category', 'companyProfile']);
    }

    public function publish(User $user, Job $job): Job
    {
        $this->assertOwnership($user, $job);

        return $this->jobs->update($job, [
            'status' => JobStatus::Published,
            'published_at' => now(),
            'closed_at' => null,
        ]);
    }

    public function close(User $user, Job $job): Job
    {
        $this->assertOwnership($user, $job);

        return $this->jobs->update($job, [
            'status' => JobStatus::Closed,
            'closed_at' => now(),
        ]);
    }

    public function reopen(User $user, Job $job): Job
    {
        $this->assertOwnership($user, $job);

        return $this->jobs->update($job, [
            'status' => JobStatus::Published,
            'closed_at' => null,
        ]);
    }

    public function destroy(User $user, Job $job): void
    {
        $this->assertOwnership($user, $job);
        $this->jobs->delete($job);
    }

    private function getProfileOrFail(User $user): \App\Models\CompanyProfile
    {
        $profile = $this->profiles->findByUserId($user->id);

        if (! $profile) {
            throw ValidationException::withMessages(['profile' => ['Company profile not found.']]);
        }

        return $profile;
    }

    private function assertOwnership(User $user, Job $job): void
    {
        $profile = $this->getProfileOrFail($user);

        if ($job->company_profile_id !== $profile->id) {
            throw ValidationException::withMessages(['job' => ['Unauthorized.']]);
        }
    }
}
