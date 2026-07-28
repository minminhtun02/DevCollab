<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\StoreProfileRequest;
use App\Http\Requests\Api\V1\Web\UpdateProfileRequest;
use App\Http\Resources\Api\V1\DeveloperProfileResource;
use App\Services\Contracts\Web\WebProfileServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebProfileController extends Controller
{
    public function __construct(private WebProfileServiceInterface $profiles)
    {
    }

    public function showMe(Request $request): JsonResponse
    {
        return ApiResponse::success(
            new DeveloperProfileResource($this->profiles->showMe($request->user()))
        );
    }

    public function store(StoreProfileRequest $request): JsonResponse
    {
        $profile = $this->profiles->store($request->user(), $request->validated());

        return ApiResponse::success(new DeveloperProfileResource($profile), 'Profile created.', 201);
    }

    public function updateMe(UpdateProfileRequest $request): JsonResponse
    {
        $profile = $this->profiles->updateMe($request->user(), $request->validated());

        return ApiResponse::success(new DeveloperProfileResource($profile), 'Profile updated.');
    }

    public function uploadPhoto(Request $request): JsonResponse
    {
        $request->validate(['photo' => ['required', 'image', 'max:2048']]);
        $profile = $this->profiles->uploadPhoto($request->user(), $request->file('photo'));

        return ApiResponse::success(new DeveloperProfileResource($profile), 'Photo uploaded.');
    }

    public function uploadCv(Request $request): JsonResponse
    {
        $request->validate(['cv' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120']]);
        $profile = $this->profiles->uploadCv($request->user(), $request->file('cv'));

        return ApiResponse::success(new DeveloperProfileResource($profile), 'CV uploaded.');
    }

    public function destroyMe(Request $request): JsonResponse
    {
        $this->profiles->destroyMe($request->user());

        return ApiResponse::success(null, 'Profile deleted.');
    }
}
