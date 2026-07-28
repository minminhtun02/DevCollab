<?php

namespace App\Http\Middleware;

use App\Support\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsCompany
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->isCompany()) {
            return ApiResponse::error('Company access required.', 403);
        }

        return $next($request);
    }
}
