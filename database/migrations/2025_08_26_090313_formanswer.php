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
        Schema::create('formanswer', function (Blueprint $table) {
            $table->uuid('formanswer_id')->primary();
            $table->text('formanswer_answer');
            $table->uuid('formsubmission_id');
            $table->uuid('formfield_id');

            $table->foreign('formsubmission_id')->references('formsubmission_id')->on('formsubmission');
            $table->foreign('formfield_id')->references('formfield_id')->on('formfield');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formanswer');
    }
};
