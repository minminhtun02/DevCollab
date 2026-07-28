<?php

namespace App\Repositories\Contracts;

use App\Models\CompanyProfile;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface CompanyProfileRepositoryInterface extends RepositoryInterface
{
    public function findByUserId(int $userId): ?CompanyProfile;

    public function paginateForAdmin(Request $request): LengthAwarePaginator;
}
