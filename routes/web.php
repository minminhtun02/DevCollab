<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'welcome'])->name('home');

Route::prefix('login')->group(function () {
    Route::get('/', fn () => inertia('Auth/WebLogin'))->name('web.login');
});

Route::prefix('register')->group(function () {
    Route::get('/', fn () => inertia('Auth/WebRegister'))->name('web.register');
});

Route::prefix('app')->group(function () {
    Route::get('/dashboard', fn () => inertia('Web/Dashboard'))->name('web.dashboard');
    Route::get('/profile', fn () => inertia('Web/Profile'))->name('web.profile');
    Route::get('/developers', fn () => inertia('Web/Developers'))->name('web.developers');
    Route::get('/jobs', fn () => inertia('Web/Jobs'))->name('web.jobs');
    Route::get('/jobs/{id}', fn (string $id) => inertia('Web/JobShow', ['id' => $id]))->name('web.jobs.show');
    Route::get('/applications', fn () => inertia('Web/Applications'))->name('web.applications');
    Route::get('/connections', fn () => inertia('Web/Connections'))->name('web.connections');
    Route::get('/messages', fn () => inertia('Web/Messages'))->name('web.messages');
    Route::get('/events', fn () => inertia('Web/Events'))->name('web.events');
    Route::get('/notifications', fn () => inertia('Web/Notifications'))->name('web.notifications');
    Route::get('/settings', fn () => inertia('Web/Settings'))->name('web.settings');
});

Route::prefix('admin')->group(function () {
    Route::get('/login', fn () => inertia('Auth/AdminLogin'))->name('admin.login');
    Route::get('/dashboard', fn () => inertia('Admin/Dashboard'))->name('admin.dashboard');

    Route::get('/users', fn () => inertia('Admin/Users'))->name('admin.users');
    Route::get('/users/{id}', fn (string $id) => inertia('Admin/UserShow', ['id' => $id]))->name('admin.users.show');
    Route::get('/users/{id}/edit', fn (string $id) => inertia('Admin/UserEdit', ['id' => $id]))->name('admin.users.edit');

    Route::get('/developer-profiles', fn () => inertia('Admin/DeveloperProfiles'))->name('admin.developer-profiles');
    Route::get('/developer-profiles/{id}', fn (string $id) => inertia('Admin/DeveloperProfileShow', ['id' => $id]))->name('admin.developer-profiles.show');
    Route::get('/developer-profiles/{id}/edit', fn (string $id) => inertia('Admin/DeveloperProfileEdit', ['id' => $id]))->name('admin.developer-profiles.edit');

    Route::get('/categories', fn () => inertia('Admin/Categories'))->name('admin.categories');
    Route::get('/categories/create', fn () => inertia('Admin/CategoryCreate'))->name('admin.categories.create');
    Route::get('/categories/{id}/edit', fn (string $id) => inertia('Admin/CategoryEdit', ['id' => $id]))->name('admin.categories.edit');

    Route::get('/skills', fn () => inertia('Admin/Skills'))->name('admin.skills');
    Route::get('/skills/create', fn () => inertia('Admin/SkillCreate'))->name('admin.skills.create');
    Route::get('/skills/{id}/edit', fn (string $id) => inertia('Admin/SkillEdit', ['id' => $id]))->name('admin.skills.edit');

    Route::get('/connections', fn () => inertia('Admin/Connections'))->name('admin.connections');
    Route::get('/connections/{id}', fn (string $id) => inertia('Admin/ConnectionShow', ['id' => $id]))->name('admin.connections.show');

    Route::get('/events', fn () => inertia('Admin/Events'))->name('admin.events');
    Route::get('/events/{id}', fn (string $id) => inertia('Admin/EventShow', ['id' => $id]))->name('admin.events.show');

    Route::get('/event-requests', fn () => inertia('Admin/EventRequests'))->name('admin.event-requests');
    Route::get('/event-requests/{id}', fn (string $id) => inertia('Admin/EventRequestShow', ['id' => $id]))->name('admin.event-requests.show');

    Route::get('/reports', fn () => inertia('Admin/Reports'))->name('admin.reports');
    Route::get('/reports/{id}', fn (string $id) => inertia('Admin/ReportShow', ['id' => $id]))->name('admin.reports.show');

    Route::get('/notifications', fn () => inertia('Admin/Notifications'))->name('admin.notifications');

    Route::get('/companies', fn () => inertia('Admin/Companies'))->name('admin.companies');
    Route::get('/companies/{id}', fn (string $id) => inertia('Admin/CompanyShow', ['id' => $id]))->name('admin.companies.show');

    Route::get('/jobs', fn () => inertia('Admin/Jobs'))->name('admin.jobs');
    Route::get('/jobs/{id}', fn (string $id) => inertia('Admin/AdminJobShow', ['id' => $id]))->name('admin.jobs.show');

    Route::get('/job-applications', fn () => inertia('Admin/JobApplications'))->name('admin.job-applications');
    Route::get('/job-applications/{id}', fn (string $id) => inertia('Admin/JobApplicationShow', ['id' => $id]))->name('admin.job-applications.show');

    Route::get('/logs', fn () => inertia('Admin/Logs'))->name('admin.logs');
    Route::get('/logs/{id}', fn (string $id) => inertia('Admin/LogShow', ['id' => $id]))->name('admin.logs.show');
});

Route::prefix('company')->group(function () {
    Route::get('/login', fn () => inertia('Auth/CompanyLogin'))->name('company.login');
    Route::get('/register', fn () => inertia('Auth/CompanyRegister'))->name('company.register');
    Route::get('/dashboard', fn () => inertia('Company/Dashboard'))->name('company.dashboard');
    Route::get('/profile', fn () => inertia('Company/Profile'))->name('company.profile');
    Route::get('/jobs', fn () => inertia('Company/Jobs'))->name('company.jobs');
    Route::get('/jobs/create', fn () => inertia('Company/JobCreate'))->name('company.jobs.create');
    Route::get('/jobs/{id}', fn (string $id) => inertia('Company/JobShow', ['id' => $id]))->name('company.jobs.show');
    Route::get('/jobs/{id}/edit', fn (string $id) => inertia('Company/JobEdit', ['id' => $id]))->name('company.jobs.edit');
    Route::get('/applications', fn () => inertia('Company/Applications'))->name('company.applications');
    Route::get('/applications/{id}', fn (string $id) => inertia('Company/ApplicationShow', ['id' => $id]))->name('company.applications.show');
});
