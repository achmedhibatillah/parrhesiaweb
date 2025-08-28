<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_to_organizationstructure', function (Blueprint $table) {
            $table->uuid('relation_id')->primary();
            $table->uuid('user_id');
            $table->uuid('organizationstructure_id');

            $table->foreign('user_id')->references('user_id')->on('user');
            $table->foreign('organizationstructure_id')->references('organizationstructure_id')->on('organizationstructure');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_to_organizationstructure');
    }
};
