<?php
namespace App\Http\Controllers\Api\V1\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Company\LoginRequest;
use App\Http\Requests\Api\V1\Company\RegisterRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Services\Contracts\AuthServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
class CompanyAuthController extends Controller {
    public function __construct(
        private AuthServiceInterface $auth,
        private CompanyProfileRepositoryInterface $profiles,
    ) {}
    public function register(RegisterRequest $request): JsonResponse {
        $data = $request->validated();
        $companyData = [
            'company_name' => $data['company_name'],
            'description' => $data['description'] ?? null,
            'website' => $data['website'] ?? null,
            'industry' => $data['industry'] ?? null,
            'company_size' => $data['company_size'] ?? null,
            'location' => $data['location'] ?? null,
        ];
        unset($data['company_name'], $data['description'], $data['website'], $data['industry'], $data['company_size'], $data['location']);
        $result = $this->auth->register($data, 'company');
        $this->profiles->create(array_merge($companyData, ['user_id' => $result['user']->id]));
        return ApiResponse::success([
            'user' => new UserResource($result['user']->load('companyProfile')),
            'token' => $result['token'],
        ], 'Company registered.', 201);
    }
    public function login(LoginRequest $request): JsonResponse {
        $result = $this->auth->login($request->email, $request->password);
        if (! $result['user']->isCompany()) {
            $result['user']->currentAccessToken()?->delete();
            throw ValidationException::withMessages(['email' => ['Company access required.']]);
        }
        return ApiResponse::success([
            'user' => new UserResource($result['user']->load('companyProfile')),
            'token' => $result['token'],
        ], 'Logged in.');
    }
    public function me(Request $request): JsonResponse {
        return ApiResponse::success(new UserResource($request->user()->load('companyProfile')));
    }
    public function logout(Request $request): JsonResponse {
        $this->auth->logout($request->user());
        return ApiResponse::success(null, 'Logged out.');
    }
}