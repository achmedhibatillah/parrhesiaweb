<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('postcategory', function (Blueprint $table) {
            $table->string('postcategory_id', 20)->primary();
            $table->string('postcategory_name', 20);
            $table->string('postcategory_status', 35);
            $table->string('postcategory_img', 36)->nullable();
        });

        DB::table('postcategory')->insert([
            ['postcategory_id' => 'politik', 'postcategory_name' => 'Politik', 'postcategory_status' => 'forpost', 'postcategory_img' => null],
            ['postcategory_id' => 'ekonomi', 'postcategory_name' => 'Ekonomi', 'postcategory_status' => 'forpost', 'postcategory_img' => null],
            ['postcategory_id' => 'teknologi', 'postcategory_name' => 'Teknologi', 'postcategory_status' => 'forpost', 'postcategory_img' => null],
            ['postcategory_id' => 'hiburan', 'postcategory_name' => 'Hiburan', 'postcategory_status' => 'forpost', 'postcategory_img' => null],
            ['postcategory_id' => 'kesehatan', 'postcategory_name' => 'Kesehatan', 'postcategory_status' => 'forpost', 'postcategory_img' => null],
            ['postcategory_id' => 'olahraga', 'postcategory_name' => 'Olahraga', 'postcategory_status' => 'forpost', 'postcategory_img' => null],
            ['postcategory_id' => 'edukasi', 'postcategory_name' => 'Edukasi', 'postcategory_status' => 'forpost', 'postcategory_img' => null],
            ['postcategory_id' => 'lingkungan', 'postcategory_name' => 'Lingkungan', 'postcategory_status' => 'forpost', 'postcategory_img' => null],
        ]);
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postcategory');
    }
};
