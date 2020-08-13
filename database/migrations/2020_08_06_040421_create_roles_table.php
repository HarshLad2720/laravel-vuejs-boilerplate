<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id')->index()->comment('AUTO_INCREMENT');
            $table->string('name',255)->nullable();
            $table->string('guard_name',255)->nullable();
            $table->string('landing_page',255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('roles')->insert(array(
            array('name' => 'Admin','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
