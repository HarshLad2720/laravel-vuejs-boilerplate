<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Users;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Users::class, function (Faker $faker) {
    return [
        'name' => $faker->name(),
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        'mobile_no' => $faker->word(),
        'role_id' => random_int(0, 9223372036854775807),
        'profile_image' => $faker->word(),
        'gender' => $faker->word(),
        'dob' => $faker->word(),
        'city' => $faker->word(),
        'address' => $faker->word(),
        'status' => $faker->word(),
        'email_verified_at' => now(),
        'remember_token' => Str::random(10)
    ];
});
