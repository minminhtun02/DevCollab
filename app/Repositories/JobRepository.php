<?php

namespace App\Repositories;

use App\Enums\JobStatus;
use App\Models\CompanyProfile;
use App\Models\Job;
use App\Repositories\Contracts\JobRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class JobRepository extends BaseRepository implements JobRepositoryInterface
{
    public function __construct(Job $model)
    {
        parent::__construct($model);
    }

    public function paginatePublished(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('status', JobStatus::Published)
            ->with(['companyProfile.user', 'category']);

        Utility::applySearch($query, $request, ['title', 'location', 'description']);
        Utility::applySort($query, $request, ['title', 'published_at', 'created_at']);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        if ($request->boolean('is_remote')) {
            $query->where('is_remote', true);
        }

        return Utility::applyPagination($query, $request);
    }

    public function paginateForCompany(CompanyProfile $companyProfile, Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('company_profile_id', $companyProfile->id)
            ->with(['category']);

        Utility::applySearch($query, $request, ['title', 'location']);
        Utility::applySort($query, $request, ['title', 'status', 'published_at', 'created_at']);

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return Utility::applyPagination($query, $request);
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['companyProfile.user', 'category']);
        Utility::applySearch($query, $request, ['title', 'location']);
        Utility::applySort($query, $request, ['title', 'status', 'published_at', 'created_at']);

        return Utility::applyPagination($query, $request);
    }
}
