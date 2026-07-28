<?php

namespace App\Repositories\Contracts;

use App\Models\DeveloperProfile;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface DeveloperProfileRepositoryInterface extends RepositoryInterface
{
    public function findByUserId(int $userId): ?DeveloperProfile;

    public function paginateForAdmin(Request $request): LengthAwarePaginator;

    public function paginatePublic(Request $request): LengthAwarePaginator;
}
