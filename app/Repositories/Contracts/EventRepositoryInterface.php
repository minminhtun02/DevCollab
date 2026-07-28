<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface EventRepositoryInterface extends RepositoryInterface
{
    public function paginateActive(Request $request): LengthAwarePaginator;

    public function paginateForAdmin(Request $request): LengthAwarePaginator;
}
