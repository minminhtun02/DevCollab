<?php
namespace App\Http\Controllers\Api\V1\Admin;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\TelegramLogResource;
use App\Models\User;
use App\Repositories\Contracts\TelegramLogRepositoryInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminTelegramController extends Controller {
    public function __construct(private TelegramLogRepositoryInterface $logs) {}
    public function stats(): JsonResponse {
        return ApiResponse::success([
            'linked_users' => User::query()->whereNotNull('telegram_chat_id')->count(),
            'logs_by_status' => $this->logs->countByStatus(),
        ]);
    }
    public function logs(Request $request): JsonResponse {
        return ApiResponse::withPagination($this->logs->paginate($request), TelegramLogResource::class);
    }
}