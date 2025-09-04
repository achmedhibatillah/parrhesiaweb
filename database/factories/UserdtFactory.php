<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Userdt;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Userdt>
 */
class UserdtFactory extends Factory
{
    protected $model = Userdt::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        return [
            'user_id'            => (string) Str::uuid(), // akan di-overwrite di seeder agar sama dengan User
            'user_phone'         => $faker->phoneNumber(),
            'userdt_headline'    => $faker->jobTitle(),
            'userdt_description' => $faker->sentence(),
            'userdt_website'     => $faker->domainName(),
            'userdt_instagram'   => $faker->userName(),
            'userdt_facebook'    => $faker->userName(),
            'userdt_linkedin'    => $faker->userName(),
            'userdt_github'      => $faker->userName(),
            'userdt_email'       => $faker->unique()->safeEmail(),
            'userdt_pp'          => $faker->imageUrl(200, 200, 'people', true, 'profile'),
            'userdt_bg'          => $faker->imageUrl(800, 400, 'nature', true, 'background'),
        ];
    }
}
