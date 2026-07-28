<?php

namespace App\Services\Contracts\Web;

use App\Models\Report;
use App\Models\User;

interface WebReportServiceInterface
{
    public function store(User $reporter, array $data): Report;
}
