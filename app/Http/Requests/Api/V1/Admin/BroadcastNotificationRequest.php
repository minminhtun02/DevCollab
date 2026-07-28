<?php
namespace App\Http\Requests\Api\V1\Admin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class BroadcastNotificationRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'role' => ['nullable', Rule::in(['developer', 'company'])],
        ];
    }
}