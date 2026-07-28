<?php

namespace App\Repositories\Contracts;

use App\Models\CompanyProfile;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface JobRepositoryInterface extends RepositoryInterface
{
    public function paginatePublished(Request $request): LengthAwarePaginator;

    public function paginateForCompany(CompanyProfile $companyProfile, Request $request): LengthAwarePaginator;

    public function paginateForAdmin(Request $request): LengthAwarePaginator;
}
