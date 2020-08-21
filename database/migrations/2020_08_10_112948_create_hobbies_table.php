<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHobbiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hobbies', function (Blueprint $table) {
            $table->increments('id')->index()->comment('AUTO_INCREMENT');
            $table->string('name',255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('hobbies')->insert(array(
            array('name' => 'Sports','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'Music','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'Travelling','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s'))
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hobbies');
    }


}
