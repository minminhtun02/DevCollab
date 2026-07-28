<?php
namespace App\Http\Requests\Api\V1\Admin;
use Illuminate\Foundation\Http\FormRequest;
class StoreSkillRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:skills,slug'],
            'is_active' => ['boolean'],
        ];
    }
}