<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\UpdateDeveloperProfileRequest;
use App\Http\Resources\Api\V1\DeveloperProfileResource;
use App\Models\DeveloperProfile;
use App\Repositories\Contracts\DeveloperProfileRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminDeveloperProfileController extends Controller {
    public function __construct(private DeveloperProfileRepositoryInterface $profiles) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->profiles->paginateForAdmin($request), DeveloperProfileResource::class);
    }
    public function show(DeveloperProfile $developerProfile): JsonResponse {
        return ApiResponse::success(new DeveloperProfileResource($developerProfile->load(['user', 'skills'])));
    }
    public function update(UpdateDeveloperProfileRequest $request, DeveloperProfile $developerProfile): JsonResponse {
        return ApiResponse::success(new DeveloperProfileResource($this->profiles->update($developerProfile, $request->validated())), 'Profile updated.');
    }
    public function destroy(DeveloperProfile $developerProfile): JsonResponse {
        $this->profiles->delete($developerProfile);
        return ApiResponse::success(null, 'Profile deleted.');
    }
}