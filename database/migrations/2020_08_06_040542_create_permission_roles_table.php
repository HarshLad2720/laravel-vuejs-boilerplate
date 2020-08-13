<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermissionRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permission_roles', function (Blueprint $table) {
            $table->unsignedInteger('permission_id');
            $table->unsignedInteger('role_id');
        });

        DB::table('permission_roles')->insert(array(
            array('permission_id' => '1','role_id' =>'1'),
            array('permission_id' => '2','role_id' =>'1'),
            array('permission_id' => '3','role_id' =>'1'),
            array('permission_id' => '4','role_id' =>'1'),

        ));

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permission_roles');
    }
}
