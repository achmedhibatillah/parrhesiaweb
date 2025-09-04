<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserDtFactory extends Factory
{
    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        return [
            'user_id' => (string) Str::uuid(), // nanti bisa di override pas dipanggil
            'user_phone' => $faker->optional()->phoneNumber(),
            'userdt_headline' => $faker->optional()->text(50),
            'userdt_description' => $faker->optional()->paragraph(),
            'userdt_website' => $faker->optional()->url(),
            'userdt_instagram' => $faker->optional()->userName(),
            'userdt_tiktok' => $faker->optional()->userName(),
            'userdt_facebook' => $faker->optional()->userName(),
            'userdt_linkedin' => $faker->optional()->userName(),
            'userdt_github' => $faker->optional()->userName(),
            'userdt_email' => $faker->boolean(), // true/false
            'userdt_scopus' => $faker->optional()->url(),
            'userdt_scholar' => $faker->optional()->url(),
            'userdt_orcid' => $faker->optional()->url(),
            'userdt_sinta' => $faker->optional()->url(),
            'userdt_pp' => $faker->optional()->uuid(),
            'userdt_bg' => $faker->optional()->uuid(),
        ];
    }
}
