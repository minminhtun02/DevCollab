<?php
namespace App\Http\Requests\Api\V1\Web;
use Illuminate\Foundation\Http\FormRequest;
class StoreEventRegistrationRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['notes' => ['nullable', 'string', 'max:1000']];
    }
}