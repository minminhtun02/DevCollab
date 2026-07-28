<?php
namespace App\Http\Requests\Api\V1\Company;
use Illuminate\Foundation\Http\FormRequest;
class StoreJobRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'employment_type' => ['nullable', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:255'],
            'is_remote' => ['boolean'],
            'salary_min' => ['nullable', 'integer', 'min:0'],
            'salary_max' => ['nullable', 'integer', 'min:0'],
            'salary_currency' => ['nullable', 'string', 'size:3'],
        ];
    }
}