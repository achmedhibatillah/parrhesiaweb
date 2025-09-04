<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user', function (Blueprint $table) {
            $table->uuid('user_id')->primary();
            $table->string('user_email', 320)->unique();
            $table->string('user_username', 21)->unique();
            $table->string('user_fullname', 64);
            $table->string('user_pass', 60);
            $table->string('role_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('role_id')->references('role_id')->on('role');
        });

        DB::table('user')->insert([
            [
                'user_id' => 'guest-trash-data',
                'user_email' => 'no-email-for-guest-trash-data-row',
                'user_username' => 'guest-trash-data',
                'user_fullname' => 'Guest Users Trash Data',
                'user_pass' => 'no-password',
                'role_id' => 'trash-data'
            ],
            [
                'user_id' => 'verified-trash-data',
                'user_email' => 'no-email-for-verified-trash-data-row',
                'user_username' => 'verified-trash-data',
                'user_fullname' => 'Verified Users Trash Data',
                'user_pass' => 'no-password',
                'role_id' => 'trash-data'
            ],
            [
                'user_id' => '4c63fd3d-aa1a-4f78-9ebc-e8c70aeec914',
                'user_email' => 'contact@achmedhibatillah.com',
                'user_username' => 'achmedhibatillah',
                'user_fullname' => 'Achmed Hibatillah',
                'user_pass' => '$2y$12$lEmtCGn0C5w3r3nVFx/S4O96chd3NBYrYV85BqUQM.5ediO0S8KJ.',
                'role_id' => 'admin-user'
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
