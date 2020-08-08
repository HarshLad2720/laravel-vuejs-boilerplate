<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->increments('id')->index()->comment('AUTO_INCREMENT');
            $table->unsignedInteger('state_id')->index()->comment('State table ID');
            $table->foreign('state_id')->references('id')->on('states');
            $table->string('name',255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('cities')->insert(array(
            array('state_id'=>'1','name' => 'Surat','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('state_id'=>'1','name' => 'Baroda','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('state_id'=>'2','name' => 'Jaipur','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s'))
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cities');
    }
}
