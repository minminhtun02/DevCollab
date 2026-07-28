<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\UpdateTelegramSettingsRequest;
use App\Services\Contracts\Telegram\TelegramServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebTelegramController extends Controller
{
    public function __construct(private TelegramServiceInterface $telegram)
    {
    }

    public function createLinkToken(Request $request): JsonResponse
    {
        return ApiResponse::success($this->telegram->createLinkToken($request->user()));
    }

    public function sendTest(Request $request): JsonResponse
    {
        $this->telegram->sendTest($request->user());

        return ApiResponse::success(null, 'Test notification queued.');
    }

    public function updateSettings(UpdateTelegramSettingsRequest $request): JsonResponse
    {
        $this->telegram->updateSettings($request->user(), $request->validated());

        return ApiResponse::success(null, 'Telegram settings updated.');
    }

    public function disconnect(Request $request): JsonResponse
    {
        $this->telegram->disconnect($request->user());

        return ApiResponse::success(null, 'Telegram disconnected.');
    }
}
