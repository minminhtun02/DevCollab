<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Web\StoreReportRequest;
use App\Http\Resources\Api\V1\ReportResource;
use App\Services\Contracts\Web\WebReportServiceInterface;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class WebReportController extends Controller
{
    public function __construct(private WebReportServiceInterface $reports)
    {
    }

    public function store(StoreReportRequest $request): JsonResponse
    {
        $report = $this->reports->store($request->user(), $request->validated());

        return ApiResponse::success(new ReportResource($report), 'Report submitted.', 201);
    }
}
