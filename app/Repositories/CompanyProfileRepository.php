<?php

namespace App\Repositories;

use App\Models\CompanyProfile;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class CompanyProfileRepository extends BaseRepository implements CompanyProfileRepositoryInterface
{
    public function __construct(CompanyProfile $model)
    {
        parent::__construct($model);
    }

    public function findByUserId(int $userId): ?CompanyProfile
    {
        return $this->model->newQuery()->where('user_id', $userId)->first();
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with('user');
        Utility::applySearch($query, $request, ['company_name', 'industry', 'location']);
        Utility::applySort($query, $request, ['company_name', 'industry', 'created_at']);

        return Utility::applyPagination($query, $request);
    }
}
