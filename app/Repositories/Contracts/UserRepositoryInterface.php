<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use App\Repositories\Contracts\RepositoryInterface as BaseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function findByEmail(string $email): ?User;

    public function paginateForAdmin(Request $request): LengthAwarePaginator;

    public function paginateDevelopers(Request $request): LengthAwarePaginator;
}
