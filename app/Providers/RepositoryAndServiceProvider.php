<?php

namespace App\Providers;

use App\Repositories\AdminLogRepository;
use App\Repositories\BlockRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\CompanyProfileRepository;
use App\Repositories\ConnectionRepository;
use App\Repositories\ConnectionRequestRepository;
use App\Repositories\ConversationRepository;
use App\Repositories\Contracts\AdminLogRepositoryInterface;
use App\Repositories\Contracts\BlockRepositoryInterface;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Repositories\Contracts\ConnectionRepositoryInterface;
use App\Repositories\Contracts\ConnectionRequestRepositoryInterface;
use App\Repositories\Contracts\ConversationRepositoryInterface;
use App\Repositories\Contracts\DeveloperProfileRepositoryInterface;
use App\Repositories\Contracts\EventRegistrationRepositoryInterface;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Repositories\Contracts\EventRequestRepositoryInterface;
use App\Repositories\Contracts\JobApplicationRepositoryInterface;
use App\Repositories\Contracts\JobRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Repositories\Contracts\ReportRepositoryInterface;
use App\Repositories\Contracts\SkillRepositoryInterface;
use App\Repositories\Contracts\TelegramLinkTokenRepositoryInterface;
use App\Repositories\Contracts\TelegramLogRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\DeveloperProfileRepository;
use App\Repositories\EventRegistrationRepository;
use App\Repositories\EventRepository;
use App\Repositories\EventRequestRepository;
use App\Repositories\JobApplicationRepository;
use App\Repositories\JobRepository;
use App\Repositories\MessageRepository;
use App\Repositories\ReportRepository;
use App\Repositories\SkillRepository;
use App\Repositories\TelegramLinkTokenRepository;
use App\Repositories\TelegramLogRepository;
use App\Repositories\UserRepository;
use App\Services\Admin\AdminDashboardService;
use App\Services\Admin\AdminLogService;
use App\Services\Admin\AdminNotificationService;
use App\Services\Admin\AdminUserService;
use App\Services\AuthService;
use App\Services\Company\CompanyDashboardService;
use App\Services\Company\CompanyJobApplicationService;
use App\Services\Company\CompanyJobService;
use App\Services\Company\CompanyProfileService;
use App\Services\Contracts\Admin\AdminDashboardServiceInterface;
use App\Services\Contracts\Admin\AdminLogServiceInterface;
use App\Services\Contracts\Admin\AdminNotificationServiceInterface;
use App\Services\Contracts\Admin\AdminUserServiceInterface;
use App\Services\Contracts\AuthServiceInterface;
use App\Services\Contracts\Company\CompanyDashboardServiceInterface;
use App\Services\Contracts\Company\CompanyJobApplicationServiceInterface;
use App\Services\Contracts\Company\CompanyJobServiceInterface;
use App\Services\Contracts\Company\CompanyProfileServiceInterface;
use App\Services\Contracts\Shared\CategoryServiceInterface;
use App\Services\Contracts\Shared\SkillServiceInterface;
use App\Services\Contracts\Telegram\TelegramServiceInterface;
use App\Services\Contracts\Web\WebBlockServiceInterface;
use App\Services\Contracts\Web\WebConnectionRequestServiceInterface;
use App\Services\Contracts\Web\WebConnectionServiceInterface;
use App\Services\Contracts\Web\WebConversationServiceInterface;
use App\Services\Contracts\Web\WebDeveloperServiceInterface;
use App\Services\Contracts\Web\WebEventRegistrationServiceInterface;
use App\Services\Contracts\Web\WebEventRequestServiceInterface;
use App\Services\Contracts\Web\WebEventServiceInterface;
use App\Services\Contracts\Web\WebJobApplicationServiceInterface;
use App\Services\Contracts\Web\WebJobServiceInterface;
use App\Services\Contracts\Web\WebMessageServiceInterface;
use App\Services\Contracts\Web\WebNotificationServiceInterface;
use App\Services\Contracts\Web\WebProfileServiceInterface;
use App\Services\Contracts\Web\WebReportServiceInterface;
use App\Services\Shared\CategoryService;
use App\Services\Shared\SkillService;
use App\Services\Telegram\TelegramService;
use App\Services\Web\WebBlockService;
use App\Services\Web\WebConnectionRequestService;
use App\Services\Web\WebConnectionService;
use App\Services\Web\WebConversationService;
use App\Services\Web\WebDeveloperService;
use App\Services\Web\WebEventRegistrationService;
use App\Services\Web\WebEventRequestService;
use App\Services\Web\WebEventService;
use App\Services\Web\WebJobApplicationService;
use App\Services\Web\WebJobService;
use App\Services\Web\WebMessageService;
use App\Services\Web\WebNotificationService;
use App\Services\Web\WebProfileService;
use App\Services\Web\WebReportService;
use Illuminate\Support\ServiceProvider;

class RepositoryAndServiceProvider extends ServiceProvider
{
    /** @var array<class-string, class-string> */
    private array $binds = [
        UserRepositoryInterface::class => UserRepository::class,
        DeveloperProfileRepositoryInterface::class => DeveloperProfileRepository::class,
        CompanyProfileRepositoryInterface::class => CompanyProfileRepository::class,
        CategoryRepositoryInterface::class => CategoryRepository::class,
        SkillRepositoryInterface::class => SkillRepository::class,
        JobRepositoryInterface::class => JobRepository::class,
        JobApplicationRepositoryInterface::class => JobApplicationRepository::class,
        ConnectionRequestRepositoryInterface::class => ConnectionRequestRepository::class,
        ConnectionRepositoryInterface::class => ConnectionRepository::class,
        ConversationRepositoryInterface::class => ConversationRepository::class,
        MessageRepositoryInterface::class => MessageRepository::class,
        EventRepositoryInterface::class => EventRepository::class,
        EventRegistrationRepositoryInterface::class => EventRegistrationRepository::class,
        EventRequestRepositoryInterface::class => EventRequestRepository::class,
        ReportRepositoryInterface::class => ReportRepository::class,
        BlockRepositoryInterface::class => BlockRepository::class,
        TelegramLinkTokenRepositoryInterface::class => TelegramLinkTokenRepository::class,
        TelegramLogRepositoryInterface::class => TelegramLogRepository::class,
        AdminLogRepositoryInterface::class => AdminLogRepository::class,
        AuthServiceInterface::class => AuthService::class,
        CategoryServiceInterface::class => CategoryService::class,
        SkillServiceInterface::class => SkillService::class,
        WebProfileServiceInterface::class => WebProfileService::class,
        WebDeveloperServiceInterface::class => WebDeveloperService::class,
        WebJobServiceInterface::class => WebJobService::class,
        WebJobApplicationServiceInterface::class => WebJobApplicationService::class,
        WebConnectionRequestServiceInterface::class => WebConnectionRequestService::class,
        WebConnectionServiceInterface::class => WebConnectionService::class,
        WebConversationServiceInterface::class => WebConversationService::class,
        WebMessageServiceInterface::class => WebMessageService::class,
        WebEventServiceInterface::class => WebEventService::class,
        WebEventRegistrationServiceInterface::class => WebEventRegistrationService::class,
        WebEventRequestServiceInterface::class => WebEventRequestService::class,
        WebNotificationServiceInterface::class => WebNotificationService::class,
        WebReportServiceInterface::class => WebReportService::class,
        WebBlockServiceInterface::class => WebBlockService::class,
        TelegramServiceInterface::class => TelegramService::class,
        AdminDashboardServiceInterface::class => AdminDashboardService::class,
        AdminUserServiceInterface::class => AdminUserService::class,
        AdminNotificationServiceInterface::class => AdminNotificationService::class,
        AdminLogServiceInterface::class => AdminLogService::class,
        CompanyProfileServiceInterface::class => CompanyProfileService::class,
        CompanyDashboardServiceInterface::class => CompanyDashboardService::class,
        CompanyJobServiceInterface::class => CompanyJobService::class,
        CompanyJobApplicationServiceInterface::class => CompanyJobApplicationService::class,
    ];

    public function register(): void
    {
        foreach ($this->binds as $abstract => $concrete) {
            $this->app->bind($abstract, $concrete);
        }
    }
}
