<?php

namespace App\Services\Web;

use App\Enums\JobApplicationStatus;
use App\Enums\JobStatus;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use App\Repositories\Contracts\JobApplicationRepositoryInterface;
use App\Services\Contracts\Web\WebJobApplicationServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class WebJobApplicationService implements WebJobApplicationServiceInterface
{
    public function __construct(private JobApplicationRepositoryInterface $applications)
    {
    }

    public function apply(User $user, Job $job, array $data, ?UploadedFile $resume = null): JobApplication
    {
        if ($job->status !== JobStatus::Published) {
            throw ValidationException::withMessages(['job' => ['This job is not accepting applications.']]);
        }

        if ($this->applications->findForJobAndUser($job, $user)) {
            throw ValidationException::withMessages(['job' => ['You have already applied to this job.']]);
        }

        $resumePath = null;
        if ($resume) {
            $resumePath = $resume->store('applications/resumes', 'public');
        }

        return $this->applications->create([
            'job_id' => $job->id,
            'user_id' => $user->id,
            'cover_letter' => $data['cover_letter'] ?? null,
            'resume_path' => $resumePath,
            'status' => JobApplicationStatus::Pending,
        ])->load(['job.companyProfile', 'job.category']);
    }

    public function myApplications(User $user, Request $request): LengthAwarePaginator
    {
        return $this->applications->paginateForUser($user, $request);
    }

    public function withdraw(User $user, JobApplication $jobApplication): JobApplication
    {
        if ($jobApplication->user_id !== $user->id) {
            throw ValidationException::withMessages(['job_application' => ['Unauthorized.']]);
        }

        if ($jobApplication->status === JobApplicationStatus::Withdrawn) {
            throw ValidationException::withMessages(['job_application' => ['Already withdrawn.']]);
        }

        return $this->applications->update($jobApplication, [
            'status' => JobApplicationStatus::Withdrawn,
            'withdrawn_at' => now(),
        ]);
    }
}
