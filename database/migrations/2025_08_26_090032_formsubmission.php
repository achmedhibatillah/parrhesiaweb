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
        Schema::create('formsubmission', function (Blueprint $table) {
            $table->uuid('formsubmission_id')->primary();
            $table->uuid('user_id');
            $table->uuid('form_id');
            $table->timestamp('created_at');

            $table->foreign('user_id')->references('user_id')->on('user');
            $table->foreign('form_id')->references('form_id')->on('form');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formsubmission');
    }
};
