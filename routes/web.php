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
    Route::get('/jobs/{id}', fn () => inertia('Web/JobShow'))->name('web.jobs.show');
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
    Route::get('/developer-profiles', fn () => inertia('Admin/DeveloperProfiles'))->name('admin.developer-profiles');
    Route::get('/categories', fn () => inertia('Admin/Categories'))->name('admin.categories');
    Route::get('/skills', fn () => inertia('Admin/Skills'))->name('admin.skills');
    Route::get('/connections', fn () => inertia('Admin/Connections'))->name('admin.connections');
    Route::get('/events', fn () => inertia('Admin/Events'))->name('admin.events');
    Route::get('/event-requests', fn () => inertia('Admin/EventRequests'))->name('admin.event-requests');
    Route::get('/reports', fn () => inertia('Admin/Reports'))->name('admin.reports');
    Route::get('/notifications', fn () => inertia('Admin/Notifications'))->name('admin.notifications');
    Route::get('/companies', fn () => inertia('Admin/Companies'))->name('admin.companies');
    Route::get('/jobs', fn () => inertia('Admin/Jobs'))->name('admin.jobs');
    Route::get('/job-applications', fn () => inertia('Admin/JobApplications'))->name('admin.job-applications');
    Route::get('/logs', fn () => inertia('Admin/Logs'))->name('admin.logs');
});

Route::prefix('company')->group(function () {
    Route::get('/login', fn () => inertia('Auth/CompanyLogin'))->name('company.login');
    Route::get('/register', fn () => inertia('Auth/CompanyRegister'))->name('company.register');
    Route::get('/dashboard', fn () => inertia('Company/Dashboard'))->name('company.dashboard');
    Route::get('/profile', fn () => inertia('Company/Profile'))->name('company.profile');
    Route::get('/jobs', fn () => inertia('Company/Jobs'))->name('company.jobs');
    Route::get('/applications', fn () => inertia('Company/Applications'))->name('company.applications');
});
