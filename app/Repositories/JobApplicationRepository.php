<?php

namespace App\Repositories;

use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use App\Repositories\Contracts\JobApplicationRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class JobApplicationRepository extends BaseRepository implements JobApplicationRepositoryInterface
{
    public function __construct(JobApplication $model)
    {
        parent::__construct($model);
    }

    public function findForJobAndUser(Job $job, User $user): ?JobApplication
    {
        return $this->model->newQuery()
            ->where('job_id', $job->id)
            ->where('user_id', $user->id)
            ->first();
    }

    public function paginateForUser(User $user, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('user_id', $user->id)
            ->with(['job.companyProfile.user', 'job.category']);

        Utility::applySort($query, $request, ['status', 'created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function paginateForCompany(int $companyProfileId, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->whereHas('job', fn ($q) => $q->where('company_profile_id', $companyProfileId))
            ->with(['user', 'job']);

        Utility::applySearch($query, $request, ['status']);
        Utility::applySort($query, $request, ['status', 'created_at']);

        if ($request->filled('job_id')) {
            $query->where('job_id', $request->integer('job_id'));
        }

        return Utility::applyPagination($query, $request);
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['user', 'job.companyProfile']);
        Utility::applySort($query, $request, ['status', 'created_at']);

        return Utility::applyPagination($query, $request);
    }
}
