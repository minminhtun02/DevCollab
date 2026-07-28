<?php
namespace App\Http\Requests\Api\V1\Admin;
use Illuminate\Foundation\Http\FormRequest;
class UpdateEventRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return (new StoreEventRequest())->rules();
    }
}