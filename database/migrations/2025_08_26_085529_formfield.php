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
        Schema::create('formfield', function (Blueprint $table) {
            $table->uuid('formfield_id')->primary();
            $table->string('formfield_label', 300);
            $table->string('formfield_type', 50);
            $table->json('formfield_options');
            $table->boolean('formfield_required')->default(true);
            $table->integer('formfield_index');
            $table->uuid('user_id');

            $table->foreign('user_id')->references('user_id')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formfield');
    }
};
