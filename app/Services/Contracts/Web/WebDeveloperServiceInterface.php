<?php

namespace App\Services\Contracts\Web;

use App\Models\DeveloperProfile;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebDeveloperServiceInterface
{
    public function index(Request $request): LengthAwarePaginator;

    public function show(DeveloperProfile $developerProfile): DeveloperProfile;
}
