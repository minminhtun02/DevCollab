<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\BanUserRequest;
use App\Http\Requests\Api\V1\Admin\UpdateUserRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Models\User;
use App\Services\Contracts\Admin\AdminUserServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminUserController extends Controller {
    public function __construct(private AdminUserServiceInterface $users) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->users->paginate($request), UserResource::class);
    }
    public function show(User $user): JsonResponse {
        return ApiResponse::success(new UserResource($this->users->show($user)));
    }
    public function update(UpdateUserRequest $request, User $user): JsonResponse {
        return ApiResponse::success(new UserResource($this->users->update($user, $request->validated())), 'User updated.');
    }
    public function ban(BanUserRequest $request, User $user): JsonResponse {
        return ApiResponse::success(new UserResource($this->users->ban($request->user(), $user, $request->input('reason'))), 'User banned.');
    }
    public function unban(Request $request, User $user): JsonResponse {
        return ApiResponse::success(new UserResource($this->users->unban($request->user(), $user)), 'User unbanned.');
    }
    public function destroy(User $user): JsonResponse {
        $this->users->destroy($user);
        return ApiResponse::success(null, 'User deleted.');
    }
}