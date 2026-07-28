<?php

namespace App\Services\Contracts\Company;

use App\Models\CompanyProfile;
use App\Models\User;
use Illuminate\Http\UploadedFile;

interface CompanyProfileServiceInterface
{
    public function show(User $user): CompanyProfile;

    public function update(User $user, array $data): CompanyProfile;

    public function uploadLogo(User $user, UploadedFile $file): CompanyProfile;
}
