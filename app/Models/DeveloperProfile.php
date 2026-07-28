<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DeveloperProfile extends Model
{
    protected $fillable = [
        'user_id',
        'headline',
        'bio',
        'location',
        'photo_path',
        'cv_path',
        'experience_years',
        'availability',
        'github_url',
        'linkedin_url',
        'portfolio_url',
        'is_public',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'developer_skill');
    }
}
