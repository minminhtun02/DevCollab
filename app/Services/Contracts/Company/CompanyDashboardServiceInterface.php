<?php

namespace App\Services\Contracts\Company;

use App\Models\User;

interface CompanyDashboardServiceInterface
{
    public function stats(User $user): array;
}
