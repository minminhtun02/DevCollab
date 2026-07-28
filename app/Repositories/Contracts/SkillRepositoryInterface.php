<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface SkillRepositoryInterface extends RepositoryInterface
{
    public function paginate(Request $request): LengthAwarePaginator;

    public function listActive(?int $categoryId = null): Collection;
}
