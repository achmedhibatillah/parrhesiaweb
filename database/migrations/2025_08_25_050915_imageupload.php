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
        Schema::create('imageupload', function (Blueprint $table) {
            $table->uuid('imageupload_id')->primary();
            $table->string('imageupload_path', 100)->unique();
            $table->string('imageupload_description', 120)->nullable();
            $table->string('imageupload_access');
            $table->uuid('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imageupload');
    }
};
