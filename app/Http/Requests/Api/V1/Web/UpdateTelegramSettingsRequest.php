<?php
namespace App\Http\Requests\Api\V1\Web;
use Illuminate\Foundation\Http\FormRequest;
class UpdateTelegramSettingsRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'job_alerts' => ['boolean'],
            'message_alerts' => ['boolean'],
            'event_alerts' => ['boolean'],
        ];
    }
}