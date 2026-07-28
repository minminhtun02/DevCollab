<?php
namespace App\Http\Requests\Api\V1\Admin;
use Illuminate\Foundation\Http\FormRequest;
class UpdateJobRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'status' => ['sometimes', 'in:draft,published,closed'],
        ];
    }
}