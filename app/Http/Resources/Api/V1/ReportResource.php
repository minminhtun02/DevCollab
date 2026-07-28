<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reporter_id' => $this->reporter_id,
            'reported_user_id' => $this->reported_user_id,
            'reason' => $this->reason,
            'description' => $this->description,
            'status' => $this->status?->value,
            'admin_notes' => $this->admin_notes,
            'reviewed_by' => $this->reviewed_by,
            'reporter' => UserResource::make($this->whenLoaded('reporter')),
            'reported_user' => UserResource::make($this->whenLoaded('reportedUser')),
            'reviewer' => UserResource::make($this->whenLoaded('reviewer')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}