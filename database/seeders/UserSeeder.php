<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserDt;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(20)->create()->each(function ($user) {
            UserDt::factory()->create([
                'user_id' => $user->user_id, // pastikan sama
            ]);
        });
    }
}
