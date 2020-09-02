<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class HobbiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('hobbies')->insert(array(
            array('name' => 'Sports','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Travelling','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Music','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Reading','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Social Activities','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
        ));
    }
}
