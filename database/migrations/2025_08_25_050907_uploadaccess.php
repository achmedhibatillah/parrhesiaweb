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
        Schema::create('uploadaccess', function (Blueprint $table) {
            $table->string('uploadaccess_label')->primary();
        });

        DB::table('uploadaccess')->insert([
            [
                'uploadaccess_label' => 'all'
            ],
            [
                'uploadaccess_label' => 'user-draft'
            ],
            [
                'uploadaccess_label' => 'guest-form'
            ],
            [
                'uploadaccess_label' => 'guest-report'
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uploadaccess');
    }
};
