<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class StatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('states')->insert(array(
            array('country_id'=>'1','name' => 'Gujarat','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('country_id'=>'1','name' => 'Rajasthan','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('country_id'=>'2','name' => 'Sydney','created_at' => Carbon::now(),'updated_at' => Carbon::now())
        ));
    }
}
