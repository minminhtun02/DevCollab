<?php

namespace App\Http\Middleware;

use App\Support\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $user->isActive()) {
            $user?->currentAccessToken()?->delete();

            return ApiResponse::error('Your account is inactive or banned.', 403);
        }

        return $next($request);
    }
}
