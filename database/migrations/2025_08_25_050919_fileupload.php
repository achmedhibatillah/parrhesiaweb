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
        Schema::create('fileupload', function (Blueprint $table) {
            $table->uuid('fileupload_id')->primary();
            $table->uuid('fileupload_path')->unique();
            $table->string('fileupload_description', 120);
            $table->string('fileupload_access');
            $table->uuid('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fileupload');
    }
};
