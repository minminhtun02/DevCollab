<?php

namespace App\Services\Contracts\Web;

use App\Models\DeveloperProfile;
use App\Models\User;
use Illuminate\Http\UploadedFile;

interface WebProfileServiceInterface
{
    public function showMe(User $user): DeveloperProfile;

    public function store(User $user, array $data): DeveloperProfile;

    public function updateMe(User $user, array $data): DeveloperProfile;

    public function uploadPhoto(User $user, UploadedFile $file): DeveloperProfile;

    public function uploadCv(User $user, UploadedFile $file): DeveloperProfile;

    public function destroyMe(User $user): void;
}
