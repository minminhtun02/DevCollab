<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('developer')->after('password');
            $table->string('status')->default('active')->after('role');
            $table->string('phone')->nullable()->after('status');
            $table->timestamp('banned_at')->nullable()->after('phone');
            $table->text('ban_reason')->nullable()->after('banned_at');
            $table->string('telegram_chat_id')->nullable()->after('ban_reason');
            $table->string('telegram_username')->nullable()->after('telegram_chat_id');
            $table->json('telegram_settings')->nullable()->after('telegram_username');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'status',
                'phone',
                'banned_at',
                'ban_reason',
                'telegram_chat_id',
                'telegram_username',
                'telegram_settings',
            ]);
        });
    }
};
