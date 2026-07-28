<?php

namespace App\Services\Web;

use App\Models\DeveloperProfile;
use App\Models\User;
use App\Repositories\Contracts\DeveloperProfileRepositoryInterface;
use App\Services\Contracts\Web\WebProfileServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class WebProfileService implements WebProfileServiceInterface
{
    public function __construct(private DeveloperProfileRepositoryInterface $profiles)
    {
    }

    public function showMe(User $user): DeveloperProfile
    {
        $profile = $this->profiles->findByUserId($user->id);

        if (! $profile) {
            throw ValidationException::withMessages([
                'profile' => ['Developer profile not found.'],
            ]);
        }

        return $profile->load('skills');
    }

    public function store(User $user, array $data): DeveloperProfile
    {
        if ($this->profiles->findByUserId($user->id)) {
            throw ValidationException::withMessages([
                'profile' => ['Profile already exists.'],
            ]);
        }

        $skillIds = $data['skill_ids'] ?? [];
        unset($data['skill_ids']);

        $profile = $this->profiles->create(array_merge($data, ['user_id' => $user->id]));

        if ($skillIds) {
            $profile->skills()->sync($skillIds);
        }

        return $profile->load('skills');
    }

    public function updateMe(User $user, array $data): DeveloperProfile
    {
        $profile = $this->getProfileOrFail($user);
        $skillIds = $data['skill_ids'] ?? null;
        unset($data['skill_ids']);

        $profile = $this->profiles->update($profile, $data);

        if ($skillIds !== null) {
            $profile->skills()->sync($skillIds);
        }

        return $profile->load('skills');
    }

    public function uploadPhoto(User $user, UploadedFile $file): DeveloperProfile
    {
        $profile = $this->getProfileOrFail($user);

        if ($profile->photo_path) {
            Storage::disk('public')->delete($profile->photo_path);
        }

        $path = $file->store('profiles/photos', 'public');

        return $this->profiles->update($profile, ['photo_path' => $path]);
    }

    public function uploadCv(User $user, UploadedFile $file): DeveloperProfile
    {
        $profile = $this->getProfileOrFail($user);

        if ($profile->cv_path) {
            Storage::disk('public')->delete($profile->cv_path);
        }

        $path = $file->store('profiles/cvs', 'public');

        return $this->profiles->update($profile, ['cv_path' => $path]);
    }

    public function destroyMe(User $user): void
    {
        $profile = $this->getProfileOrFail($user);

        if ($profile->photo_path) {
            Storage::disk('public')->delete($profile->photo_path);
        }

        if ($profile->cv_path) {
            Storage::disk('public')->delete($profile->cv_path);
        }

        $profile->skills()->detach();
        $this->profiles->delete($profile);
    }

    private function getProfileOrFail(User $user): DeveloperProfile
    {
        $profile = $this->profiles->findByUserId($user->id);

        if (! $profile) {
            throw ValidationException::withMessages([
                'profile' => ['Developer profile not found.'],
            ]);
        }

        return $profile;
    }
}
