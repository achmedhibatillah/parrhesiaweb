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
        Schema::create('postcategory', function (Blueprint $table) {
            $table->uuid('postcategory_id')->primary();
            $table->string('postcategory_slug', 150)->unique();
            $table->string('postcategory_name', 20);
            $table->string('postcategory_status', 35);
            $table->string('postcategory_img', 36)->nullable();

            $table->foreign('postcategory_img')->references('imageupload_id')->on('imageupload');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postcategory');
    }
};
