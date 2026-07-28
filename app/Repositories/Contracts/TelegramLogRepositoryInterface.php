<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface TelegramLogRepositoryInterface extends RepositoryInterface
{
    public function paginate(Request $request): LengthAwarePaginator;

    public function countByStatus(): array;
}
