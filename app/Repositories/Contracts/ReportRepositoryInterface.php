<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface ReportRepositoryInterface extends RepositoryInterface
{
    public function paginateForAdmin(Request $request): LengthAwarePaginator;

    public function hasPendingReport(User $reporter, User $reported): bool;
}
