<?php

namespace App\Models;

use App\Enums\EventRequestStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventRequest extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'location',
        'preferred_date',
        'status',
        'admin_notes',
        'reviewed_by',
    ];

    protected function casts(): array
    {
        return [
            'preferred_date' => 'datetime',
            'status' => EventRequestStatus::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
