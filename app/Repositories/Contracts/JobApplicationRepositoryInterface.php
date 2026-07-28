<?php

namespace App\Repositories\Contracts;

use App\Models\Job;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface JobApplicationRepositoryInterface extends RepositoryInterface
{
    public function findForJobAndUser(Job $job, User $user): ?\App\Models\JobApplication;

    public function paginateForUser(User $user, Request $request): LengthAwarePaginator;

    public function paginateForCompany(int $companyProfileId, Request $request): LengthAwarePaginator;

    public function paginateForAdmin(Request $request): LengthAwarePaginator;
}
