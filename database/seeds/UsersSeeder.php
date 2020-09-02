<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        factory(Users::class, 10)->create();

        DB::table('users')->insert(array(
            array(
                'name' => 'test admin',
                'email'=>'admin@gmail.com',
                'password'=>'$2y$10$gCb4kNHFsGHu.hgvMo5.W.sI/my48gC9OTVSbwTT7aOnY/kpidUHK', // 123456
                'mobile_no'=>'1234567890',
                'role_id'=>'1',
                'country_id'=>'1',
                'state_id'=>'1',
                'city_id'=>'1',
                'status'=>'1',
                'email_verified_at'=> config('constants.calender.date_time'),
                'created_at' => config('constants.calender.date_time'),
                'updated_at' => config('constants.calender.date_time')
            ),

            array(
                'name' => 'test user',
                'email'=>'test@gmail.com',
                'password'=>'$2y$10$gCb4kNHFsGHu.hgvMo5.W.sI/my48gC9OTVSbwTT7aOnY/kpidUHK', // 123456
                'mobile_no'=>'1234567890',
                'role_id'=>'1',
                'country_id'=>'1',
                'state_id'=>'1',
                'city_id'=>'1',
                'status'=>'0',
                'email_verified_at'=> Null,
                'created_at' => config('constants.calender.date_time'),
                'updated_at' => config('constants.calender.date_time')
            ),

            array(
                'name' => 'test user',
                'email'=>'contact@gmail.com',
                'password'=>'$2y$10$gCb4kNHFsGHu.hgvMo5.W.sI/my48gC9OTVSbwTT7aOnY/kpidUHK', // 123456
                'mobile_no'=>'1234567890',
                'role_id'=>'1',
                'country_id'=>'1',
                'state_id'=>'1',
                'city_id'=>'1',
                'status'=>'0',
                'email_verified_at'=> Null,
                'created_at' => config('constants.calender.date_time'),
                'updated_at' => config('constants.calender.date_time')
            )
        ));
    }
}
