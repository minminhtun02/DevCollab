<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class JobApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'job_id' => $this->job_id,
            'user_id' => $this->user_id,
            'cover_letter' => $this->cover_letter,
            'resume_url' => $this->resume_path ? Storage::disk('public')->url($this->resume_path) : null,
            'status' => $this->status?->value,
            'company_notes' => $this->company_notes,
            'withdrawn_at' => $this->withdrawn_at?->toIso8601String(),
            'job' => JobResource::make($this->whenLoaded('job')),
            'user' => UserResource::make($this->whenLoaded('user')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}