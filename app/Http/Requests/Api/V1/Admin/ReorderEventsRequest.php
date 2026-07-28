<?php
namespace App\Http\Requests\Api\V1\Admin;
use Illuminate\Foundation\Http\FormRequest;
class ReorderEventsRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'event_ids' => ['required', 'array'],
            'event_ids.*' => ['integer', 'exists:events,id'],
        ];
    }
}