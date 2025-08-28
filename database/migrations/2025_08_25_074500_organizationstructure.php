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
        Schema::create('organizationstructure', function (Blueprint $table) {
            $table->uuid('organizationstructure_id')->primary();
            $table->string('organizationstructure_name', 100);
            $table->longText('organizationstructure_desc')->nullable();
            $table->uuid('organizationstructure_img')->nullable();
            $table->uuid('main_id')->nullable();

            $table->foreign('organizationstructure_img')->references('imageupload_id')->on('imageupload');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizationstructure');
    }
};
