<?php
namespace App\Http\Requests\Api\V1\Company;
use Illuminate\Foundation\Http\FormRequest;
class UpdateJobRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return (new StoreJobRequest())->rules();
    }
}