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
        Schema::create('user_to_focus', function (Blueprint $table) {
            $table->uuid('relation_id')->primary();
            $table->uuid('user_id');
            $table->uuid('focus_id');

            $table->foreign('user_id')->references('user_id')->on('user');
            $table->foreign('focus_id')->references('focus_id')->on('focus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_to_focus');
    }
};
