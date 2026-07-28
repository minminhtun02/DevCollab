<?php
namespace App\Http\Requests\Api\V1\Company;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class UpdateJobApplicationStatusRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'status' => ['required', Rule::in(['pending', 'reviewed', 'interview', 'accepted', 'rejected'])],
            'company_notes' => ['nullable', 'string'],
        ];
    }
}