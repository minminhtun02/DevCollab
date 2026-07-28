<?php

namespace App\Repositories;

use App\Models\TelegramLog;
use App\Repositories\Contracts\TelegramLogRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class TelegramLogRepository extends BaseRepository implements TelegramLogRepositoryInterface
{
    public function __construct(TelegramLog $model)
    {
        parent::__construct($model);
    }

    public function paginate(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with('user');
        Utility::applySort($query, $request, ['type', 'status', 'sent_at', 'created_at']);

        if ($request->filled('type')) {
            $query->where('type', $request->string('type'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return Utility::applyPagination($query, $request);
    }

    public function countByStatus(): array
    {
        return $this->model->newQuery()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status')
            ->all();
    }
}
