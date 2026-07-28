<?php

namespace App\Services\Shared;

use App\Models\Skill;
use App\Repositories\Contracts\SkillRepositoryInterface;
use App\Services\Contracts\Shared\SkillServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SkillService implements SkillServiceInterface
{
    public function __construct(private SkillRepositoryInterface $skills)
    {
    }

    public function listActive(?int $categoryId = null): Collection
    {
        return $this->skills->listActive($categoryId);
    }

    public function paginate(Request $request): LengthAwarePaginator
    {
        return $this->skills->paginate($request);
    }

    public function create(array $data): Skill
    {
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        return $this->skills->create($data);
    }

    public function update(Skill $skill, array $data): Skill
    {
        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        return $this->skills->update($skill, $data);
    }

    public function delete(Skill $skill): void
    {
        $this->skills->delete($skill);
    }
}
