<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\UpdateCompanyRequest;
use App\Http\Resources\Api\V1\CompanyProfileResource;
use App\Models\CompanyProfile;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminCompanyController extends Controller {
    public function __construct(private CompanyProfileRepositoryInterface $companies) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->companies->paginateForAdmin($request), CompanyProfileResource::class);
    }
    public function show(CompanyProfile $companyProfile): JsonResponse {
        return ApiResponse::success(new CompanyProfileResource($companyProfile->load('user')));
    }
    public function update(UpdateCompanyRequest $request, CompanyProfile $companyProfile): JsonResponse {
        return ApiResponse::success(new CompanyProfileResource($this->companies->update($companyProfile, $request->validated())), 'Company updated.');
    }
}