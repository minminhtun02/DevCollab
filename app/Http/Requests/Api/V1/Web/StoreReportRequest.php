<?php
namespace App\Http\Requests\Api\V1\Web;
use Illuminate\Foundation\Http\FormRequest;
class StoreReportRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'reported_user_id' => ['required', 'integer', 'exists:users,id'],
            'reason' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ];
    }
}