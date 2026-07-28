<?php

namespace App\Services\Contracts\Web;

use App\Models\EventRequest;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebEventRequestServiceInterface
{
    public function index(User $user, Request $request): LengthAwarePaginator;

    public function store(User $user, array $data): EventRequest;
}
