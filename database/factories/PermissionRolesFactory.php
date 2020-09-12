<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\PermissionRole;
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

$factory->define(PermissionRole::class, function (Faker $faker) {
    return [
        'permission_id' => random_int(0, 9223372036854775807),
        'role_id' => random_int(0, 9223372036854775807)
    ];
});
