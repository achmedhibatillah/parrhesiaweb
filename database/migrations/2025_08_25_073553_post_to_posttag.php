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
        Schema::create('post_to_posttag', function (Blueprint $table) {
            $table->uuid('relation_id')->primary();
            $table->uuid('post_id');
            $table->uuid('posttag_id');

            $table->foreign('post_id')->references('post_id')->on('post');
            $table->foreign('posttag_id')->references('posttag_id')->on('posttag');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_to_posttag');
    }
};
