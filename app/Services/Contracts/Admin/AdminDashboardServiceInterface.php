<?php

namespace App\Services\Contracts\Admin;

interface AdminDashboardServiceInterface
{
    public function stats(): array;

    public function userGrowth(): array;

    public function activity(): array;

    public function charts(): array;
}
