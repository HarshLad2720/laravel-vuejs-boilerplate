<?php

use App\Models\User\Role;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        factory(Role::class, 10)->create();

        DB::table('roles')->insert(array(
            array('name' => 'Administrator','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Test','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Test_2','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Test_3','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Test_4','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
        ));
    }
}
