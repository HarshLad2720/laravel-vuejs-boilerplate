<?php

use App\Models\User\Role;
use Illuminate\Database\Seeder;

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
            array('name' => 'Administrator','created_at' => config('constants.calender.date_time'),'updated_at' => config('constants.calender.date_time')),
            array('name' => 'Test','created_at' => config('constants.calender.date_time'),'updated_at' => config('constants.calender.date_time')),
            array('name' => 'Test_2','created_at' => config('constants.calender.date_time'),'updated_at' => config('constants.calender.date_time')),
            array('name' => 'Test_3','created_at' => config('constants.calender.date_time'),'updated_at' => config('constants.calender.date_time')),
            array('name' => 'Test_4','created_at' => config('constants.calender.date_time'),'updated_at' => config('constants.calender.date_time')),
        ));
    }
}
