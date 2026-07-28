<?php

namespace App\Services\Web;

use App\Models\Connection;
use App\Models\User;
use App\Repositories\Contracts\ConnectionRepositoryInterface;
use App\Services\Contracts\Web\WebConnectionServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class WebConnectionService implements WebConnectionServiceInterface
{
    public function __construct(private ConnectionRepositoryInterface $connections)
    {
    }

    public function index(User $user, Request $request): LengthAwarePaginator
    {
        return $this->connections->paginateForUser($user, $request);
    }

    public function show(User $user, Connection $connection): Connection
    {
        $this->assertParticipant($user, $connection);

        return $connection->load(['userOne', 'userTwo', 'conversation']);
    }

    public function destroy(User $user, Connection $connection): void
    {
        $this->assertParticipant($user, $connection);

        DB::transaction(function () use ($connection) {
            if ($connection->conversation) {
                $connection->conversation->messages()->delete();
                $connection->conversation->users()->detach();
                $connection->conversation->delete();
            }

            $this->connections->delete($connection);
        });
    }

    private function assertParticipant(User $user, Connection $connection): void
    {
        if (! $connection->involvesUser($user)) {
            throw ValidationException::withMessages(['connection' => ['Unauthorized.']]);
        }
    }
}
