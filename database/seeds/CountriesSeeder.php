<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('countries')->insert(array(
            array('name' => 'India','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Australia','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'Canada','created_at' => Carbon::now(),'updated_at' => Carbon::now())
        ));
    }
}
