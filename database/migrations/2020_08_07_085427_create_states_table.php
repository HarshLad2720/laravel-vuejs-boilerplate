<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('states', function (Blueprint $table) {
            $table->increments('id')->index()->comment('AUTO_INCREMENT');
            $table->unsignedInteger('country_id')->index()->comment('countries table id');
            $table->foreign('country_id')->references('id')->on('countries');
            $table->string('name',255)->nullable();
            $table->unsignedInteger('created_by')->nullable()->comment('Users table ID');
            $table->unsignedInteger('updated_by')->nullable()->comment('Users table ID');
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('states')->insert(array(
            array('country_id'=>'1','name' => 'Gujarat','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('country_id'=>'1','name' => 'Rajasthan','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('country_id'=>'2','name' => 'Sydney','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s'))
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('states');
    }
}
