<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermisssionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id')->index()->comment('AUTO_INCREMENT');
            $table->string('permissions',255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('permissions')->insert(array(
            array('permissions' => 'index-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('permissions' => 'show-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('permissions' => 'update-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('permissions' => 'destroy-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s'))

        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');
    }
}
