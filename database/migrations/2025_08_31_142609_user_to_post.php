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
        Schema::create('user_to_post', function (Blueprint $table) {
            $table->uuid('relation_id')->primary();
            $table->string('relation_role', 20);
            $table->boolean('relation_isinitiator')->default(false);
            $table->boolean('relation_acc')->default(false);
            $table->uuid('user_id');
            $table->uuid('post_id');

            $table->foreign('user_id')->references('user_id')->on('user');
            $table->foreign('post_id')->references('post_id')->on('post');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_to_post');
    }
};
