<?php

namespace App\Repositories\Contracts;

use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface EventRegistrationRepositoryInterface extends RepositoryInterface
{
    public function paginateForEvent(Event $event, Request $request): LengthAwarePaginator;

    public function findForEventAndUser(Event $event, User $user): ?\App\Models\EventRegistration;

    public function paginateForAdmin(Event $event, Request $request): LengthAwarePaginator;
}
