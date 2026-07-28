<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Support\Utility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function findByEmail(string $email): ?User
    {
        return $this->model->newQuery()->where('email', $email)->first();
    }

    public function paginateForAdmin(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()->with(['developerProfile', 'companyProfile']);
        Utility::applySearch($query, $request, ['name', 'email']);
        Utility::applySort($query, $request, ['name', 'email', 'role', 'status', 'created_at']);

        return Utility::applyPagination($query, $request);
    }

    public function paginateDevelopers(Request $request): LengthAwarePaginator
    {
        $query = $this->model->newQuery()
            ->where('role', 'developer')
            ->where('status', 'active')
            ->whereHas('developerProfile', fn ($q) => $q->where('is_public', true))
            ->with(['developerProfile.skills']);

        Utility::applySearch($query, $request, ['name', 'email']);
        Utility::applySort($query, $request, ['name', 'email', 'created_at']);

        return Utility::applyPagination($query, $request);
    }
}
