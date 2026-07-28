<?php

namespace App\Repositories;

use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\User;
use App\Repositories\Contracts\ReportRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class ReportRepository extends BaseRepository implements ReportRepositoryInterface
{
    public function __construct(Report $model)
    {
        parent::__construct($model);
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['reporter', 'reportedUser', 'reviewer']);
        Utility::applySearch($query, $request, ['reason']);
        Utility::applySort($query, $request, ['status', 'created_at']);

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return Utility::applyPagination($query, $request);
    }

    public function hasPendingReport(User $reporter, User $reported): bool
    {
        return $this->model->newQuery()
            ->where('reporter_id', $reporter->id)
            ->where('reported_user_id', $reported->id)
            ->where('status', ReportStatus::Pending)
            ->exists();
    }
}
