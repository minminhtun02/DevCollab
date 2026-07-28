<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class DeveloperProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'headline' => $this->headline,
            'bio' => $this->bio,
            'location' => $this->location,
            'photo_url' => $this->photo_path ? Storage::disk('public')->url($this->photo_path) : null,
            'cv_url' => $this->cv_path ? Storage::disk('public')->url($this->cv_path) : null,
            'experience_years' => $this->experience_years,
            'availability' => $this->availability,
            'github_url' => $this->github_url,
            'linkedin_url' => $this->linkedin_url,
            'portfolio_url' => $this->portfolio_url,
            'is_public' => $this->is_public,
            'user' => UserResource::make($this->whenLoaded('user')),
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}