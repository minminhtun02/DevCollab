<?php
namespace App\Http\Requests\Api\V1\Web;
use Illuminate\Foundation\Http\FormRequest;
class ReorderPinnedConversationsRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'conversation_ids' => ['required', 'array'],
            'conversation_ids.*' => ['integer', 'exists:conversations,id'],
        ];
    }
}