<?php
namespace App\Http\Requests\Api\V1\Web;
use Illuminate\Foundation\Http\FormRequest;
class ApplyJobRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'cover_letter' => ['nullable', 'string'],
            'resume' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ];
    }
}