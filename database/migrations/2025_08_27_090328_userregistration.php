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
        Schema::create('userregistration', function (Blueprint $table) {
            $table->uuid('userregistration_id')->primary();
            $table->string('userregistration_email')->unique();
            $table->integer('userregistration_otp');
            $table->integer('userregistration_chance')->default(4);
            $table->boolean('userregistration_passed')->default(false);
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('userregistration');
    }
};
