<?php

namespace App\Services\Contracts;

use App\Models\User;

interface AuthServiceInterface
{
    public function register(array $data, string $role): array;

    public function login(string $email, string $password): array;

    public function logout(User $user): void;
}
