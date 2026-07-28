<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface CategoryRepositoryInterface extends RepositoryInterface
{
    public function paginate(Request $request): LengthAwarePaginator;

    public function listActive(): Collection;
}
