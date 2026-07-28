<?php

namespace App\Repositories;

use App\Models\Event;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class EventRepository extends BaseRepository implements EventRepositoryInterface
{
    public function __construct(Event $model)
    {
        parent::__construct($model);
    }

    public function paginateActive(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('is_active', true)
            ->with('creator')
            ->orderBy('sort_order')
            ->orderBy('starts_at');

        Utility::applySearch($query, $request, ['title', 'location', 'description']);

        return Utility::applyPagination($query, $request);
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with('creator')->orderBy('sort_order');
        Utility::applySearch($query, $request, ['title', 'location']);
        Utility::applySort($query, $request, ['title', 'starts_at', 'sort_order', 'created_at']);

        return Utility::applyPagination($query, $request);
    }
}
