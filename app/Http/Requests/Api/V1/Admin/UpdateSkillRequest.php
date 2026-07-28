<?php
namespace App\Http\Requests\Api\V1\Admin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class UpdateSkillRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'category_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('skills', 'slug')->ignore($this->route('skill'))],
            'is_active' => ['boolean'],
        ];
    }
}