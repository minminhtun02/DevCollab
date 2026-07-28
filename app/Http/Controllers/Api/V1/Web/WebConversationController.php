<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\MuteConversationRequest;
use App\Http\Requests\Api\V1\Web\ReorderPinnedConversationsRequest;
use App\Http\Resources\Api\V1\ConversationResource;
use App\Models\Conversation;
use App\Services\Contracts\Web\WebConversationServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebConversationController extends Controller
{
    public function __construct(private WebConversationServiceInterface $conversations)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->conversations->index($request->user(), $request),
            ConversationResource::class,
        );
    }

    public function reorderPinned(ReorderPinnedConversationsRequest $request): JsonResponse
    {
        $this->conversations->reorderPinned($request->user(), $request->validated('conversation_ids'));

        return ApiResponse::success(null, 'Pinned conversations reordered.');
    }

    public function show(Request $request, Conversation $conversation): JsonResponse
    {
        return ApiResponse::success(
            new ConversationResource($this->conversations->show($request->user(), $conversation))
        );
    }

    public function pin(Request $request, Conversation $conversation): JsonResponse
    {
        return ApiResponse::success(
            new ConversationResource($this->conversations->pin($request->user(), $conversation)),
            'Conversation pinned.',
        );
    }

    public function unpin(Request $request, Conversation $conversation): JsonResponse
    {
        return ApiResponse::success(
            new ConversationResource($this->conversations->unpin($request->user(), $conversation)),
            'Conversation unpinned.',
        );
    }

    public function mute(MuteConversationRequest $request, Conversation $conversation): JsonResponse
    {
        return ApiResponse::success(
            new ConversationResource(
                $this->conversations->mute($request->user(), $conversation, $request->integer('hours') ?: null)
            ),
            'Conversation muted.',
        );
    }

    public function unmute(Request $request, Conversation $conversation): JsonResponse
    {
        return ApiResponse::success(
            new ConversationResource($this->conversations->unmute($request->user(), $conversation)),
            'Conversation unmuted.',
        );
    }

    public function destroy(Request $request, Conversation $conversation): JsonResponse
    {
        $this->conversations->destroy($request->user(), $conversation);

        return ApiResponse::success(null, 'Conversation left.');
    }
}
