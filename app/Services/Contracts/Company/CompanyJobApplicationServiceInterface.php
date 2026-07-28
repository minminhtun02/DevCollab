<?php

namespace App\Services\Contracts\Company;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface CompanyJobApplicationServiceInterface
{
    public function index(User $user, Request $request): LengthAwarePaginator;

    public function show(User $user, JobApplication $jobApplication): JobApplication;

    public function updateStatus(User $user, JobApplication $jobApplication, string $status, ?string $notes = null): JobApplication;

    public function sendInterviewAcknowledgment(User $user, JobApplication $jobApplication): JobApplication;
}
