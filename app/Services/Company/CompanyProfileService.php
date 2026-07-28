<?php

namespace App\Services\Company;

use App\Models\CompanyProfile;
use App\Models\User;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Services\Contracts\Company\CompanyProfileServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class CompanyProfileService implements CompanyProfileServiceInterface
{
    public function __construct(private CompanyProfileRepositoryInterface $profiles)
    {
    }

    public function show(User $user): CompanyProfile
    {
        return $this->getProfileOrFail($user);
    }

    public function update(User $user, array $data): CompanyProfile
    {
        $profile = $this->getProfileOrFail($user);

        return $this->profiles->update($profile, $data);
    }

    public function uploadLogo(User $user, UploadedFile $file): CompanyProfile
    {
        $profile = $this->getProfileOrFail($user);

        if ($profile->logo_path) {
            Storage::disk('public')->delete($profile->logo_path);
        }

        $path = $file->store('companies/logos', 'public');

        return $this->profiles->update($profile, ['logo_path' => $path]);
    }

    private function getProfileOrFail(User $user): CompanyProfile
    {
        $profile = $this->profiles->findByUserId($user->id);

        if (! $profile) {
            throw ValidationException::withMessages([
                'profile' => ['Company profile not found.'],
            ]);
        }

        return $profile->load('user');
    }
}
