<?php
namespace App\Http\Requests\Api\V1\Web;
use Illuminate\Foundation\Http\FormRequest;
class MuteConversationRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['hours' => ['nullable', 'integer', 'min:1', 'max:720']];
    }
}