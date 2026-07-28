<?php
namespace App\Http\Controllers\Api\V1\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Company\UpdateProfileRequest;
use App\Http\Resources\Api\V1\CompanyProfileResource;
use App\Services\Contracts\Company\CompanyProfileServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class CompanyProfileController extends Controller {
    public function __construct(private CompanyProfileServiceInterface $profiles) {}
    public function show(Request $request): JsonResponse {
        return ApiResponse::success(new CompanyProfileResource($this->profiles->show($request->user())));
    }
    public function update(UpdateProfileRequest $request): JsonResponse {
        return ApiResponse::success(new CompanyProfileResource($this->profiles->update($request->user(), $request->validated())), 'Profile updated.');
    }
    public function uploadLogo(Request $request): JsonResponse {
        $request->validate(['logo' => ['required', 'image', 'max:2048']]);
        return ApiResponse::success(new CompanyProfileResource($this->profiles->uploadLogo($request->user(), $request->file('logo'))), 'Logo uploaded.');
    }
}