<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface AdminLogRepositoryInterface extends RepositoryInterface
{
    public function paginate(Request $request): LengthAwarePaginator;
}
