<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\BlockResource;
use App\Models\User;
use App\Services\Contracts\Web\WebBlockServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebBlockController extends Controller
{
    public function __construct(private WebBlockServiceInterface $blocks)
    {
    }

    public function block(Request $request, User $user): JsonResponse
    {
        $this->blocks->block($request->user(), $user);

        return ApiResponse::success(null, 'User blocked.');
    }

    public function unblock(Request $request, User $user): JsonResponse
    {
        $this->blocks->unblock($request->user(), $user);

        return ApiResponse::success(null, 'User unblocked.');
    }

    public function index(Request $request): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->blocks->index($request->user(), $request),
            BlockResource::class,
        );
    }
}
