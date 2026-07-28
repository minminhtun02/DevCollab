<?php

namespace App\Services\Contracts\Web;

use App\Models\Event;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface WebEventServiceInterface
{
    public function index(Request $request): LengthAwarePaginator;

    public function show(Event $event): Event;
}
