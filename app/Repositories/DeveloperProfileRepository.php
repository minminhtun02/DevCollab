<?php

namespace App\Repositories;

use App\Models\DeveloperProfile;
use App\Repositories\Contracts\DeveloperProfileRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class DeveloperProfileRepository extends BaseRepository implements DeveloperProfileRepositoryInterface
{
    public function __construct(DeveloperProfile $model)
    {
        parent::__construct($model);
    }

    public function findByUserId(int $userId): ?DeveloperProfile
    {
        return $this->model->newQuery()->where('user_id', $userId)->first();
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['user', 'skills']);
        Utility::applySearch($query, $request, ['headline', 'location']);
        Utility::applySort($query, $request, ['headline', 'location', 'experience_years', 'created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function paginatePublic(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('is_public', true)
            ->with(['user', 'skills']);

        Utility::applySearch($query, $request, ['headline', 'location']);
        Utility::applySort($query, $request, ['headline', 'experience_years', 'created_at']);

        return Utility::applyPagination($query, $request);
    }
}
