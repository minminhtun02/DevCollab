<?php

namespace App\Models;

use App\Enums\JobApplicationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    protected $fillable = [
        'job_id',
        'user_id',
        'cover_letter',
        'resume_path',
        'status',
        'company_notes',
        'withdrawn_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => JobApplicationStatus::class,
            'withdrawn_at' => 'datetime',
        ];
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
