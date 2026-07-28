<?php

namespace App\Services\Web;

use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\User;
use App\Repositories\Contracts\ReportRepositoryInterface;
use App\Services\Contracts\Web\WebReportServiceInterface;
use Illuminate\Validation\ValidationException;

class WebReportService implements WebReportServiceInterface
{
    public function __construct(private ReportRepositoryInterface $reports)
    {
    }

    public function store(User $reporter, array $data): Report
    {
        $reportedUserId = (int) $data['reported_user_id'];

        if ($reporter->id === $reportedUserId) {
            throw ValidationException::withMessages(['reported_user_id' => ['You cannot report yourself.']]);
        }

        User::query()->findOrFail($reportedUserId);

        if ($this->reports->hasPendingReport($reporter, User::query()->findOrFail($reportedUserId))) {
            throw ValidationException::withMessages(['reported_user_id' => ['You already have a pending report for this user.']]);
        }

        return $this->reports->create([
            'reporter_id' => $reporter->id,
            'reported_user_id' => $reportedUserId,
            'reason' => $data['reason'],
            'description' => $data['description'] ?? null,
            'status' => ReportStatus::Pending,
        ])->load(['reporter', 'reportedUser']);
    }
}
