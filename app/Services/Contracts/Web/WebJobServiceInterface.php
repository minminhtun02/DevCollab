<?php

namespace App\Services\Contracts\Web;

use App\Models\Job;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebJobServiceInterface
{
    public function index(Request $request): LengthAwarePaginator;

    public function show(Job $job): Job;
}
