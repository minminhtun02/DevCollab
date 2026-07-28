<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\CompanyProfile;
use App\Models\DeveloperProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public const DEFAULT_PASSWORD = 'password';

    public function run(): void
    {
        $admin = User::query()->updateOrCreate(
            ['email' => 'admin@devcollab.test'],
            [
                'name' => 'Admin User',
                'password' => Hash::make(self::DEFAULT_PASSWORD),
                'role' => UserRole::Admin,
                'status' => UserStatus::Active,
                'email_verified_at' => now(),
            ],
        );

        $developer = User::query()->updateOrCreate(
            ['email' => 'developer@devcollab.test'],
            [
                'name' => 'Dev User',
                'password' => Hash::make(self::DEFAULT_PASSWORD),
                'role' => UserRole::Developer,
                'status' => UserStatus::Active,
                'phone' => '+959123456789',
                'email_verified_at' => now(),
            ],
        );

        DeveloperProfile::query()->updateOrCreate(
            ['user_id' => $developer->id],
            [
                'headline' => 'Full Stack Developer',
                'bio' => 'Building web apps with Laravel and React. Open to collaboration and new opportunities.',
                'location' => 'Yangon, Myanmar',
                'experience_years' => 3,
                'availability' => 'open',
                'github_url' => 'https://github.com/devuser',
                'linkedin_url' => 'https://linkedin.com/in/devuser',
                'portfolio_url' => 'https://devuser.example.com',
                'is_public' => true,
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'developer2@devcollab.test'],
            [
                'name' => 'Jane Developer',
                'password' => Hash::make(self::DEFAULT_PASSWORD),
                'role' => UserRole::Developer,
                'status' => UserStatus::Active,
                'email_verified_at' => now(),
            ],
        );

        $developerTwo = User::query()->where('email', 'developer2@devcollab.test')->first();

        if ($developerTwo) {
            DeveloperProfile::query()->updateOrCreate(
                ['user_id' => $developerTwo->id],
                [
                    'headline' => 'Backend Engineer',
                    'bio' => 'PHP, Laravel, API design, and database optimization.',
                    'location' => 'Mandalay, Myanmar',
                    'experience_years' => 5,
                    'availability' => 'open',
                    'is_public' => true,
                ],
            );
        }

        $companyUser = User::query()->updateOrCreate(
            ['email' => 'company@devcollab.test'],
            [
                'name' => 'Company Owner',
                'password' => Hash::make(self::DEFAULT_PASSWORD),
                'role' => UserRole::Company,
                'status' => UserStatus::Active,
                'email_verified_at' => now(),
            ],
        );

        CompanyProfile::query()->updateOrCreate(
            ['user_id' => $companyUser->id],
            [
                'company_name' => 'DevCollab Tech',
                'description' => 'A tech company hiring talented developers.',
                'website' => 'https://devcollab.test',
                'industry' => 'Technology',
                'company_size' => '11-50',
                'location' => 'Yangon, Myanmar',
            ],
        );

        $this->command?->info('Seeded users (password: '.self::DEFAULT_PASSWORD.'):');
        $this->command?->table(
            ['Portal', 'Email', 'Role'],
            [
                ['Admin', $admin->email, $admin->role->value],
                ['Web', $developer->email, $developer->role->value],
                ['Web', 'developer2@devcollab.test', UserRole::Developer->value],
                ['Company', $companyUser->email, $companyUser->role->value],
            ],
        );
    }
}
