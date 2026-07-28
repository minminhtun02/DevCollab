<?php

namespace App\Services\Contracts\Web;

use App\Models\Connection;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebConnectionServiceInterface
{
    public function index(User $user, Request $request): LengthAwarePaginator;

    public function show(User $user, Connection $connection): Connection;

    public function destroy(User $user, Connection $connection): void;
}
