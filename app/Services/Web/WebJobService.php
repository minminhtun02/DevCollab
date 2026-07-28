<?php

namespace App\Services\Web;

use App\Enums\JobStatus;
use App\Models\Job;
use App\Repositories\Contracts\JobRepositoryInterface;
use App\Services\Contracts\Web\WebJobServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WebJobService implements WebJobServiceInterface
{
    public function __construct(private JobRepositoryInterface $jobs)
    {
    }

    public function index(Request $request): LengthAwarePaginator
    {
        return $this->jobs->paginatePublished($request);
    }

    public function show(Job $job): Job
    {
        if ($job->status !== JobStatus::Published) {
            throw ValidationException::withMessages([
                'job' => ['Job is not available.'],
            ]);
        }

        return $job->load(['companyProfile.user', 'category']);
    }
}
