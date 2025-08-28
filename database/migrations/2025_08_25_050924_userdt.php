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
        Schema::create('userdt', function (Blueprint $table) {
            $table->uuid('user_id')->unique();
            $table->string('user_phone', 30)->nullable();
            $table->string('userdt_headline', 300)->nullable();
            $table->longText('userdt_description')->nullable();
            $table->string('userdt_website', 1200)->nullable();
            $table->string('userdt_instagram', 50)->nullable();
            $table->string('userdt_tiktok', 50)->nullable();
            $table->string('userdt_facebook', 50)->nullable();
            $table->string('userdt_linkedin', 50)->nullable();
            $table->string('userdt_github', 50)->nullable();
            $table->boolean('userdt_email')->default(false);
            $table->string('userdt_scopus', 1200)->nullable();
            $table->string('userdt_scholar', 1200)->nullable();
            $table->string('userdt_orcid', 1200)->nullable();
            $table->string('userdt_sinta', 1200)->nullable();
            $table->uuid('userdt_pp')->nullable();
            $table->uuid('userdt_bg')->nullable();

            $table->foreign('user_id')->references('user_id')->on('user');
            $table->foreign('userdt_pp')->references('imageupload_id')->on('imageupload');
            $table->foreign('userdt_bg')->references('imageupload_id')->on('imageupload');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('userdt');
    }
};
