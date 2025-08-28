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
        Schema::create('role', function (Blueprint $table) {
            $table->string('role_id')->primary();
            $table->string('role_name');
            $table->datetime('role_end')->nullable();
        });

        DB::table('role')->insert([
            [
                'role_id' => 'guest-user',
                'role_name' => 'Guest Name'
            ],
            [
                'role_id' => 'trash-data',
                'role_name' => 'Trash Data',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role');
    }
};
