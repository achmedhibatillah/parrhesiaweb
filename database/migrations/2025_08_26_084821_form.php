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
        Schema::create('form', function (Blueprint $table) {
            $table->uuid('form_id')->primary();
            $table->string('form_slug', 150)->unique();
            $table->string('form_title', 120);
            $table->string('form_description', 300)->nullable();
            $table->dateTime('form_start')->nullable();
            $table->dateTime('form_end')->nullable();
            $table->string('form_status', 50);
            $table->uuid('user_id');
            $table->timestamp('created_at');

            $table->foreign('user_id')->references('user_id')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form');
    }
};
