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
            $table->string('fileupload_title', 120);
            $table->string('uploadaccess_label');
            $table->uuid('user_id');

            $table->foreign('uploadaccess_label')->references('uploadaccess_label')->on('uploadaccess');
            $table->foreign('user_id')->references('user_id')->on('user');
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
