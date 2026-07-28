<?php
namespace App\Http\Controllers\Api\V1\Telegram;
use App\Http\Controllers\Controller;
use App\Services\Contracts\Telegram\TelegramServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class TelegramWebhookController extends Controller {
    public function __construct(private TelegramServiceInterface $telegram) {}
    public function handle(Request $request): JsonResponse {
        $this->telegram->handleWebhook($request->all());
        return ApiResponse::success(null, 'Webhook processed.');
    }
}