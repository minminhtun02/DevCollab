<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\StoreSkillRequest;
use App\Http\Requests\Api\V1\Admin\UpdateSkillRequest;
use App\Http\Resources\Api\V1\SkillResource;
use App\Models\Skill;
use App\Services\Contracts\Shared\SkillServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminSkillController extends Controller {
    public function __construct(private SkillServiceInterface $skills) {}
    public function index(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->skills->paginate($request), SkillResource::class);
    }
    public function store(StoreSkillRequest $request): JsonResponse {
        return ApiResponse::success(new SkillResource($this->skills->create($request->validated())), 'Skill created.', 201);
    }
    public function update(UpdateSkillRequest $request, Skill $skill): JsonResponse {
        return ApiResponse::success(new SkillResource($this->skills->update($skill, $request->validated())), 'Skill updated.');
    }
    public function destroy(Skill $skill): JsonResponse {
        $this->skills->delete($skill);
        return ApiResponse::success(null, 'Skill deleted.');
    }
}