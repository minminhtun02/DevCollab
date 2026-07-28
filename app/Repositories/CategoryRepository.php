<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }

    public function paginate(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery();
        Utility::applySearch($query, $request, ['name', 'slug', 'description']);
        Utility::applySort($query, $request, ['name', 'slug', 'is_active', 'created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function listActive(): Collection
    {
        return $this->model->newQuery()->where('is_active', true)->orderBy('name')->get();
    }
}
