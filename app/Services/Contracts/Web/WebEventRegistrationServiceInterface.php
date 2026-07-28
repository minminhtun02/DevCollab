<?php

namespace App\Services\Contracts\Web;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebEventRegistrationServiceInterface
{
    public function index(Event $event, Request $request): LengthAwarePaginator;

    public function store(User $user, Event $event, array $data): EventRegistration;

    public function accept(User $user, Event $event, EventRegistration $registration): EventRegistration;

    public function reject(User $user, Event $event, EventRegistration $registration): EventRegistration;
}
