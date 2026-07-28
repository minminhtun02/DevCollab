<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role?->value,
            'status' => $this->status?->value,
            'telegram_chat_id' => $this->when($request->user()?->id === $this->id, $this->telegram_chat_id),
            'telegram_username' => $this->when($request->user()?->id === $this->id, $this->telegram_username),
            'telegram_settings' => $this->when($request->user()?->id === $this->id, $this->telegram_settings),
            'developer_profile' => DeveloperProfileResource::make($this->whenLoaded('developerProfile')),
            'company_profile' => CompanyProfileResource::make($this->whenLoaded('companyProfile')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
