<?php

namespace App\Services\Web;

use App\Models\DeveloperProfile;
use App\Repositories\Contracts\DeveloperProfileRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\Web\WebDeveloperServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WebDeveloperService implements WebDeveloperServiceInterface
{
    public function __construct(
        private UserRepositoryInterface $users,
        private DeveloperProfileRepositoryInterface $profiles,
    ) {
    }

    public function index(Request $request): LengthAwarePaginator
    {
        return $this->users->paginateDevelopers($request);
    }

    public function show(DeveloperProfile $developerProfile): DeveloperProfile
    {
        if (! $developerProfile->is_public) {
            throw ValidationException::withMessages([
                'developer' => ['Developer profile is not public.'],
            ]);
        }

        return $developerProfile->load(['user', 'skills']);
    }
}
