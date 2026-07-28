<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\StoreMessageRequest;
use App\Http\Requests\Api\V1\Web\UpdateMessageRequest;
use App\Http\Resources\Api\V1\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Services\Contracts\Web\WebMessageServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebMessageController extends Controller
{
    public function __construct(private WebMessageServiceInterface $messages)
    {
    }

    public function index(Request $request, Conversation $conversation): JsonResponse
    {
        return ApiResponse::withPagination(
            $this->messages->index($request->user(), $conversation, $request),
            MessageResource::class,
        );
    }

    public function store(StoreMessageRequest $request, Conversation $conversation): JsonResponse
    {
        $message = $this->messages->store($request->user(), $conversation, $request->validated());

        return ApiResponse::success(new MessageResource($message), 'Message sent.', 201);
    }

    public function update(UpdateMessageRequest $request, Conversation $conversation, Message $message): JsonResponse
    {
        $message = $this->messages->update($request->user(), $conversation, $message, $request->validated());

        return ApiResponse::success(new MessageResource($message), 'Message updated.');
    }

    public function destroy(Request $request, Conversation $conversation, Message $message): JsonResponse
    {
        $this->messages->destroy($request->user(), $conversation, $message);

        return ApiResponse::success(null, 'Message deleted.');
    }

    public function pin(Request $request, Conversation $conversation, Message $message): JsonResponse
    {
        return ApiResponse::success(
            new MessageResource($this->messages->pin($request->user(), $conversation, $message)),
            'Message pinned.',
        );
    }

    public function unpin(Request $request, Conversation $conversation, Message $message): JsonResponse
    {
        return ApiResponse::success(
            new MessageResource($this->messages->unpin($request->user(), $conversation, $message)),
            'Message unpinned.',
        );
    }

    public function markAsRead(Request $request, Conversation $conversation): JsonResponse
    {
        $this->messages->markAsRead($request->user(), $conversation);

        return ApiResponse::success(null, 'Conversation marked as read.');
    }
}
