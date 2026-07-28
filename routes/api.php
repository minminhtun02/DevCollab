<?php

use App\Http\Controllers\Api\V1\Admin\AdminCategoryController;
use App\Http\Controllers\Api\V1\Admin\AdminCompanyController;
use App\Http\Controllers\Api\V1\Admin\AdminConnectionController;
use App\Http\Controllers\Api\V1\Admin\AdminConnectionRequestController;
use App\Http\Controllers\Api\V1\Admin\AdminDashboardController;
use App\Http\Controllers\Api\V1\Admin\AdminDeveloperProfileController;
use App\Http\Controllers\Api\V1\Admin\AdminEventController;
use App\Http\Controllers\Api\V1\Admin\AdminEventRegistrationController;
use App\Http\Controllers\Api\V1\Admin\AdminEventRequestController;
use App\Http\Controllers\Api\V1\Admin\AdminJobApplicationController;
use App\Http\Controllers\Api\V1\Admin\AdminJobController;
use App\Http\Controllers\Api\V1\Admin\AdminLogController;
use App\Http\Controllers\Api\V1\Admin\AdminNotificationController;
use App\Http\Controllers\Api\V1\Admin\AdminReportController;
use App\Http\Controllers\Api\V1\Admin\AdminSkillController;
use App\Http\Controllers\Api\V1\Admin\AdminTelegramController;
use App\Http\Controllers\Api\V1\Admin\AdminUserController;
use App\Http\Controllers\Api\V1\Company\CompanyAuthController;
use App\Http\Controllers\Api\V1\Company\CompanyCategoryController;
use App\Http\Controllers\Api\V1\Company\CompanyDashboardController;
use App\Http\Controllers\Api\V1\Company\CompanyJobApplicationController;
use App\Http\Controllers\Api\V1\Company\CompanyJobController;
use App\Http\Controllers\Api\V1\Company\CompanyProfileController;
use App\Http\Controllers\Api\V1\Telegram\TelegramWebhookController;
use App\Http\Controllers\Api\V1\Web\WebAuthController;
use App\Http\Controllers\Api\V1\Web\WebBlockController;
use App\Http\Controllers\Api\V1\Web\WebCategoryController;
use App\Http\Controllers\Api\V1\Web\WebConnectionController;
use App\Http\Controllers\Api\V1\Web\WebConnectionRequestController;
use App\Http\Controllers\Api\V1\Web\WebConversationController;
use App\Http\Controllers\Api\V1\Web\WebDeveloperController;
use App\Http\Controllers\Api\V1\Web\WebEventController;
use App\Http\Controllers\Api\V1\Web\WebEventRegistrationController;
use App\Http\Controllers\Api\V1\Web\WebEventRequestController;
use App\Http\Controllers\Api\V1\Web\WebJobApplicationController;
use App\Http\Controllers\Api\V1\Web\WebJobController;
use App\Http\Controllers\Api\V1\Web\WebMessageController;
use App\Http\Controllers\Api\V1\Web\WebNotificationController;
use App\Http\Controllers\Api\V1\Web\WebProfileController;
use App\Http\Controllers\Api\V1\Web\WebReportController;
use App\Http\Controllers\Api\V1\Web\WebSkillController;
use App\Http\Controllers\Api\V1\Web\WebTelegramController;
use App\Http\Resources\Api\V1\UserResource;
use App\Services\AuthService;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/telegram/webhook', [TelegramWebhookController::class, 'handle']);

    Route::prefix('web')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/register', [WebAuthController::class, 'register']);
            Route::post('/login', [WebAuthController::class, 'login']);
        });

        Route::middleware(['auth:sanctum', 'active'])->group(function () {
            Route::get('/auth/me', [WebAuthController::class, 'me']);
            Route::post('/auth/logout', [WebAuthController::class, 'logout']);

            Route::get('/profile/me', [WebProfileController::class, 'showMe']);
            Route::post('/profile', [WebProfileController::class, 'store']);
            Route::put('/profile/me', [WebProfileController::class, 'updateMe']);
            Route::post('/profile/me/photo', [WebProfileController::class, 'uploadPhoto']);
            Route::post('/profile/me/cv', [WebProfileController::class, 'uploadCv']);
            Route::delete('/profile/me', [WebProfileController::class, 'destroyMe']);

            Route::get('/jobs', [WebJobController::class, 'index']);
            Route::get('/jobs/{job}', [WebJobController::class, 'show']);
            Route::post('/jobs/{job}/apply', [WebJobApplicationController::class, 'apply']);
            Route::get('/job-applications/me', [WebJobApplicationController::class, 'myApplications']);
            Route::post('/job-applications/{jobApplication}/withdraw', [WebJobApplicationController::class, 'withdraw']);

            Route::get('/developers', [WebDeveloperController::class, 'index']);
            Route::get('/developers/{developerProfile}', [WebDeveloperController::class, 'show']);

            Route::get('/categories', [WebCategoryController::class, 'index']);
            Route::get('/skills', [WebSkillController::class, 'index']);

            Route::post('/connection-requests', [WebConnectionRequestController::class, 'store']);
            Route::get('/connection-requests/received', [WebConnectionRequestController::class, 'received']);
            Route::get('/connection-requests/sent', [WebConnectionRequestController::class, 'sent']);
            Route::post('/connection-requests/{connectionRequest}/accept', [WebConnectionRequestController::class, 'accept']);
            Route::post('/connection-requests/{connectionRequest}/reject', [WebConnectionRequestController::class, 'reject']);
            Route::post('/connection-requests/{connectionRequest}/cancel', [WebConnectionRequestController::class, 'cancel']);

            Route::get('/connections', [WebConnectionController::class, 'index']);
            Route::get('/connections/{connection}', [WebConnectionController::class, 'show']);
            Route::delete('/connections/{connection}', [WebConnectionController::class, 'destroy']);

            Route::get('/conversations', [WebConversationController::class, 'index']);
            Route::post('/conversations/pinned/reorder', [WebConversationController::class, 'reorderPinned']);
            Route::get('/conversations/{conversation}', [WebConversationController::class, 'show']);
            Route::post('/conversations/{conversation}/pin', [WebConversationController::class, 'pin']);
            Route::delete('/conversations/{conversation}/pin', [WebConversationController::class, 'unpin']);
            Route::post('/conversations/{conversation}/mute', [WebConversationController::class, 'mute']);
            Route::delete('/conversations/{conversation}/mute', [WebConversationController::class, 'unmute']);
            Route::delete('/conversations/{conversation}', [WebConversationController::class, 'destroy']);
            Route::get('/conversations/{conversation}/messages', [WebMessageController::class, 'index']);
            Route::post('/conversations/{conversation}/messages', [WebMessageController::class, 'store']);
            Route::put('/conversations/{conversation}/messages/{message}', [WebMessageController::class, 'update']);
            Route::delete('/conversations/{conversation}/messages/{message}', [WebMessageController::class, 'destroy']);
            Route::post('/conversations/{conversation}/messages/{message}/pin', [WebMessageController::class, 'pin']);
            Route::delete('/conversations/{conversation}/messages/{message}/pin', [WebMessageController::class, 'unpin']);
            Route::post('/conversations/{conversation}/read', [WebMessageController::class, 'markAsRead']);

            Route::get('/events', [WebEventController::class, 'index']);
            Route::get('/events/{event}', [WebEventController::class, 'show']);
            Route::get('/events/{event}/registrations', [WebEventRegistrationController::class, 'index']);
            Route::post('/events/{event}/registrations', [WebEventRegistrationController::class, 'store']);
            Route::post('/events/{event}/registrations/{eventRegistration}/accept', [WebEventRegistrationController::class, 'accept']);
            Route::post('/events/{event}/registrations/{eventRegistration}/reject', [WebEventRegistrationController::class, 'reject']);
            Route::get('/event-requests', [WebEventRequestController::class, 'index']);
            Route::post('/event-requests', [WebEventRequestController::class, 'store']);

            Route::post('/telegram/link-token', [WebTelegramController::class, 'createLinkToken']);
            Route::post('/telegram/test', [WebTelegramController::class, 'sendTest']);
            Route::put('/telegram/settings', [WebTelegramController::class, 'updateSettings']);
            Route::delete('/telegram/disconnect', [WebTelegramController::class, 'disconnect']);

            Route::get('/notifications', [WebNotificationController::class, 'index']);
            Route::get('/notifications/unread-count', [WebNotificationController::class, 'unreadCount']);
            Route::get('/notifications/{notification}', [WebNotificationController::class, 'show']);
            Route::post('/notifications/{notification}/read', [WebNotificationController::class, 'markAsRead']);
            Route::post('/notifications/read-all', [WebNotificationController::class, 'markAllAsRead']);

            Route::post('/reports', [WebReportController::class, 'store']);

            Route::post('/users/{user}/block', [WebBlockController::class, 'block']);
            Route::delete('/users/{user}/block', [WebBlockController::class, 'unblock']);
            Route::get('/blocked-users', [WebBlockController::class, 'index']);
        });
    });

    Route::prefix('admin')->group(function () {
        Route::post('/auth/login', function (Request $request, AuthService $auth) {
            $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required', 'string'],
            ]);

            $result = $auth->login($request->email, $request->password);

            if (! $result['user']->isAdmin()) {
                $result['user']->currentAccessToken()?->delete();

                return ApiResponse::error('Admin access required.', 403);
            }

            return ApiResponse::success([
                'user' => new UserResource($result['user']),
                'token' => $result['token'],
            ], 'Admin logged in.');
        });

        Route::middleware(['auth:sanctum', 'admin'])->group(function () {
            Route::get('/auth/me', fn (Request $request) => ApiResponse::success(
                new UserResource($request->user())
            ));
            Route::post('/auth/logout', function (Request $request) {
                $request->user()->currentAccessToken()?->delete();

                return ApiResponse::success(null, 'Logged out.');
            });

            Route::get('/dashboard/stats', [AdminDashboardController::class, 'stats']);
            Route::get('/dashboard/user-growth', [AdminDashboardController::class, 'userGrowth']);
            Route::get('/dashboard/activity', [AdminDashboardController::class, 'activity']);
            Route::get('/dashboard/charts', [AdminDashboardController::class, 'charts']);

            Route::get('/users', [AdminUserController::class, 'index']);
            Route::get('/users/{user}', [AdminUserController::class, 'show']);
            Route::put('/users/{user}', [AdminUserController::class, 'update']);
            Route::post('/users/{user}/ban', [AdminUserController::class, 'ban']);
            Route::post('/users/{user}/unban', [AdminUserController::class, 'unban']);
            Route::delete('/users/{user}', [AdminUserController::class, 'destroy']);

            Route::get('/developer-profiles', [AdminDeveloperProfileController::class, 'index']);
            Route::get('/developer-profiles/{developerProfile}', [AdminDeveloperProfileController::class, 'show']);
            Route::put('/developer-profiles/{developerProfile}', [AdminDeveloperProfileController::class, 'update']);
            Route::delete('/developer-profiles/{developerProfile}', [AdminDeveloperProfileController::class, 'destroy']);

            Route::get('/categories', [AdminCategoryController::class, 'index']);
            Route::post('/categories', [AdminCategoryController::class, 'store']);
            Route::put('/categories/{category}', [AdminCategoryController::class, 'update']);
            Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy']);

            Route::get('/skills', [AdminSkillController::class, 'index']);
            Route::post('/skills', [AdminSkillController::class, 'store']);
            Route::put('/skills/{skill}', [AdminSkillController::class, 'update']);
            Route::delete('/skills/{skill}', [AdminSkillController::class, 'destroy']);

            Route::get('/connection-requests', [AdminConnectionRequestController::class, 'index']);
            Route::get('/connections', [AdminConnectionController::class, 'index']);
            Route::get('/connections/{connection}', [AdminConnectionController::class, 'show']);
            Route::delete('/connections/{connection}', [AdminConnectionController::class, 'destroy']);

            Route::get('/events', [AdminEventController::class, 'index']);
            Route::post('/events/reorder', [AdminEventController::class, 'reorder']);
            Route::post('/events', [AdminEventController::class, 'store']);
            Route::get('/events/{event}', [AdminEventController::class, 'show']);
            Route::put('/events/{event}', [AdminEventController::class, 'update']);
            Route::delete('/events/{event}', [AdminEventController::class, 'destroy']);
            Route::get('/events/{event}/registrations', [AdminEventRegistrationController::class, 'index']);
            Route::post('/events/{event}/registrations/{eventRegistration}/accept', [AdminEventRegistrationController::class, 'accept']);
            Route::post('/events/{event}/registrations/{eventRegistration}/reject', [AdminEventRegistrationController::class, 'reject']);

            Route::get('/event-requests', [AdminEventRequestController::class, 'index']);
            Route::get('/event-requests/{eventRequest}', [AdminEventRequestController::class, 'show']);
            Route::post('/event-requests/{eventRequest}/approve', [AdminEventRequestController::class, 'approve']);
            Route::post('/event-requests/{eventRequest}/reject', [AdminEventRequestController::class, 'reject']);

            Route::get('/reports', [AdminReportController::class, 'index']);
            Route::get('/reports/{report}', [AdminReportController::class, 'show']);
            Route::post('/reports/{report}/review', [AdminReportController::class, 'review']);
            Route::post('/reports/{report}/resolve', [AdminReportController::class, 'resolve']);
            Route::post('/reports/{report}/reject', [AdminReportController::class, 'reject']);

            Route::get('/notifications', [AdminNotificationController::class, 'index']);
            Route::post('/notifications/broadcast', [AdminNotificationController::class, 'broadcast']);

            Route::get('/telegram/stats', [AdminTelegramController::class, 'stats']);
            Route::get('/telegram/logs', [AdminTelegramController::class, 'logs']);

            Route::get('/logs', [AdminLogController::class, 'index']);
            Route::get('/logs/{adminLog}', [AdminLogController::class, 'show']);

            Route::get('/companies', [AdminCompanyController::class, 'index']);
            Route::get('/companies/{companyProfile}', [AdminCompanyController::class, 'show']);
            Route::put('/companies/{companyProfile}', [AdminCompanyController::class, 'update']);

            Route::get('/jobs', [AdminJobController::class, 'index']);
            Route::get('/jobs/{job}', [AdminJobController::class, 'show']);
            Route::put('/jobs/{job}', [AdminJobController::class, 'update']);
            Route::delete('/jobs/{job}', [AdminJobController::class, 'destroy']);

            Route::get('/job-applications', [AdminJobApplicationController::class, 'index']);
            Route::get('/job-applications/{jobApplication}', [AdminJobApplicationController::class, 'show']);
        });
    });

    Route::prefix('company')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/register', [CompanyAuthController::class, 'register']);
            Route::post('/login', [CompanyAuthController::class, 'login']);
        });

        Route::get('/categories', [CompanyCategoryController::class, 'index']);

        Route::middleware(['auth:sanctum', 'company'])->group(function () {
            Route::get('/auth/me', [CompanyAuthController::class, 'me']);
            Route::post('/auth/logout', [CompanyAuthController::class, 'logout']);

            Route::get('/dashboard/stats', [CompanyDashboardController::class, 'stats']);

            Route::get('/profile', [CompanyProfileController::class, 'show']);
            Route::put('/profile', [CompanyProfileController::class, 'update']);
            Route::post('/profile/logo', [CompanyProfileController::class, 'uploadLogo']);

            Route::get('/jobs', [CompanyJobController::class, 'index']);
            Route::post('/jobs', [CompanyJobController::class, 'store']);
            Route::get('/jobs/{job}', [CompanyJobController::class, 'show']);
            Route::put('/jobs/{job}', [CompanyJobController::class, 'update']);
            Route::post('/jobs/{job}/publish', [CompanyJobController::class, 'publish']);
            Route::post('/jobs/{job}/close', [CompanyJobController::class, 'close']);
            Route::post('/jobs/{job}/reopen', [CompanyJobController::class, 'reopen']);
            Route::delete('/jobs/{job}', [CompanyJobController::class, 'destroy']);

            Route::get('/job-applications', [CompanyJobApplicationController::class, 'index']);
            Route::get('/job-applications/{jobApplication}', [CompanyJobApplicationController::class, 'show']);
            Route::put('/job-applications/{jobApplication}/status', [CompanyJobApplicationController::class, 'updateStatus']);
            Route::post('/job-applications/{jobApplication}/interview-ack', [CompanyJobApplicationController::class, 'sendInterviewAcknowledgment']);
        });
    });
});
