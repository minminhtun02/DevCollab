<?php
namespace App\Http\Requests\Api\V1\Web;
use Illuminate\Foundation\Http\FormRequest;
class StoreConnectionRequestRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'receiver_id' => ['required', 'integer', 'exists:users,id'],
            'message' => ['nullable', 'string', 'max:500'],
        ];
    }
}