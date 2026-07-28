<?php

namespace App\Repositories;

use App\Models\AdminLog;
use App\Repositories\Contracts\AdminLogRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class AdminLogRepository extends BaseRepository implements AdminLogRepositoryInterface
{
    public function __construct(AdminLog $model)
    {
        parent::__construct($model);
    }

    public function paginate(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with('admin');
        Utility::applySearch($query, $request, ['action', 'subject_type']);
        Utility::applySort($query, $request, ['action', 'created_at']);

        if ($request->filled('admin_id')) {
            $query->where('admin_id', $request->integer('admin_id'));
        }

        return Utility::applyPagination($query, $request);
    }
}
