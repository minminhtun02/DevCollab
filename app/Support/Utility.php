<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class Utility
{
    public static function applySearch(Builder $query, Request $request, array $columns): Builder
    {
        $search = trim((string) $request->query('search', ''));

        if ($search === '') {
            return $query;
        }

        return $query->where(function (Builder $builder) use ($search, $columns): void {
            foreach ($columns as $index => $column) {
                $method = $index === 0 ? 'where' : 'orWhere';
                $builder->{$method}($column, 'like', '%'.$search.'%');
            }
        });
    }

    public static function applySort(Builder $query, Request $request, array $allowedColumns, string $defaultColumn = 'created_at', string $defaultDirection = 'desc'): Builder
    {
        $sortBy = (string) $request->query('sort_by', $defaultColumn);
        $sortDir = strtolower((string) $request->query('sort_dir', $defaultDirection));

        if (! in_array($sortBy, $allowedColumns, true)) {
            $sortBy = $defaultColumn;
        }

        if (! in_array($sortDir, ['asc', 'desc'], true)) {
            $sortDir = $defaultDirection;
        }

        return $query->orderBy($sortBy, $sortDir);
    }

    public static function applyPagination(Builder $query, Request $request, int $defaultPerPage = 15): LengthAwarePaginator
    {
        $perPage = (int) $request->query('per_page', $defaultPerPage);

        if ($perPage < 1) {
            $perPage = $defaultPerPage;
        }

        if ($perPage > 100) {
            $perPage = 100;
        }

        return $query->paginate($perPage)->withQueryString();
    }
}
