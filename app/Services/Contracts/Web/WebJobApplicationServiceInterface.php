<?php

namespace App\Services\Contracts\Web;

use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

interface WebJobApplicationServiceInterface
{
    public function apply(User $user, Job $job, array $data, ?UploadedFile $resume = null): JobApplication;

    public function myApplications(User $user, Request $request): LengthAwarePaginator;

    public function withdraw(User $user, JobApplication $jobApplication): JobApplication;
}
