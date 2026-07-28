<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventRequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'preferred_date' => $this->preferred_date?->toIso8601String(),
            'status' => $this->status?->value,
            'admin_notes' => $this->admin_notes,
            'reviewed_by' => $this->reviewed_by,
            'user' => UserResource::make($this->whenLoaded('user')),
            'reviewer' => UserResource::make($this->whenLoaded('reviewer')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}