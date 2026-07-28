<?php

namespace App\Services\Contracts\Shared;

use App\Models\Skill;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface SkillServiceInterface
{
    public function listActive(?int $categoryId = null): Collection;

    public function paginate(Request $request): LengthAwarePaginator;

    public function create(array $data): Skill;

    public function update(Skill $skill, array $data): Skill;

    public function delete(Skill $skill): void;
}
