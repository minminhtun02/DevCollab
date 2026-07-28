<?php

namespace App\Services\Contracts\Company;

use App\Models\Job;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface CompanyJobServiceInterface
{
    public function index(User $user, Request $request): LengthAwarePaginator;

    public function store(User $user, array $data): Job;

    public function show(User $user, Job $job): Job;

    public function update(User $user, Job $job, array $data): Job;

    public function publish(User $user, Job $job): Job;

    public function close(User $user, Job $job): Job;

    public function reopen(User $user, Job $job): Job;

    public function destroy(User $user, Job $job): void;
}
