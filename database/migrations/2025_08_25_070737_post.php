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
        Schema::create('post', function (Blueprint $table) {
            $table->uuid('post_id')->primary();
            $table->string('post_slug', 150)->unique()->nullable();
            $table->string('post_title', 120)->nullable();
            $table->string('post_description', 300)->nullable();
            $table->longText('post_content')->nullable();
            $table->string('post_status', 20)->default('draft');
            $table->uuid('postcategory_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post');
    }
};
