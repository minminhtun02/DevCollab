<?php

namespace App\Repositories;

use App\Models\Skill;
use App\Repositories\Contracts\SkillRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class SkillRepository extends BaseRepository implements SkillRepositoryInterface
{
    public function __construct(Skill $model)
    {
        parent::__construct($model);
    }

    public function paginate(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with('category');
        Utility::applySearch($query, $request, ['name', 'slug']);
        Utility::applySort($query, $request, ['name', 'slug', 'is_active', 'created_at']);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        return Utility::applyPagination($query, $request);
    }

    public function listActive(?int $categoryId = null): Collection
    {
        $query = $this->model->newQuery()->where('is_active', true)->with('category')->orderBy('name');

        if ($categoryId !== null) {
            $query->where('category_id', $categoryId);
        }

        return $query->get();
    }
}
