<?php

use App\PermissionRole;
use Illuminate\Database\Seeder;

class PermissionRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(PermissionRole::class, 10)->create();
    }
}
