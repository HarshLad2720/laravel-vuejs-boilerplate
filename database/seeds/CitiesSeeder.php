<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('cities')->insert(array(
            array('state_id'=>'1','name' => 'Surat','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('state_id'=>'1','name' => 'Baroda','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('state_id'=>'2','name' => 'Jaipur','created_at' => Carbon::now(),'updated_at' => Carbon::now())
        ));
    }
}
