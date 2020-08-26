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
            $table->string('name',255)->nullable();
            $table->string('guard_name',255)->nullable();
            $table->unsignedInteger('created_by')->nullable()->comment('Users table ID');
            $table->unsignedInteger('updated_by')->nullable()->comment('Users table ID');
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('permissions')->insert(array(

            array('name' => 'my-users','guard_name' => 'root','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'index-users','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'show-users','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'update-users','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'destroy-users','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'export-users','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'importBulk-hobbies','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'my-countries','guard_name' => 'root','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'store-countries','guard_name' => 'my-countries','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'index-countries','guard_name' => 'my-countries','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'show-countries','guard_name' => 'my-countries','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'update-countries','guard_name' => 'my-countries','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'destroy-countries','guard_name' => 'my-countries','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'export-countries','guard_name' => 'my-countries','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'importBulk-countries','guard_name' => 'my-countries','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'my-states','guard_name' => 'root','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'store-states','guard_name' => 'my-states','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'index-states','guard_name' => 'my-states','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'show-states','guard_name' => 'my-states','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'update-states','guard_name' => 'my-states','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'destroy-states','guard_name' => 'my-states','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'export-states','guard_name' => 'my-states','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'importBulk-states','guard_name' => 'my-states','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'my-cities','guard_name' => 'root','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'store-cities','guard_name' => 'my-cities','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'index-cities','guard_name' => 'my-cities','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'show-cities','guard_name' => 'my-cities','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'update-cities','guard_name' => 'my-cities','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'destroy-cities','guard_name' => 'my-cities','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'export-cities','guard_name' => 'my-cities','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'importBulk-cities','guard_name' => 'my-cities','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'my-hobbies','guard_name' => 'root','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'store-hobbies','guard_name' => 'my-hobbies','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'index-hobbies','guard_name' => 'my-hobbies','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'show-hobbies','guard_name' => 'my-hobbies','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'update-hobbies','guard_name' => 'my-hobbies','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'destroy-hobbies','guard_name' => 'my-hobbies','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'export-hobbies','guard_name' => 'my-hobbies','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'importBulk-hobbies','guard_name' => 'my-hobbies','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'my-roles','guard_name' => 'root','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'store-roles','guard_name' => 'my-roles','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'index-roles','guard_name' => 'my-roles','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'show-roles','guard_name' => 'my-roles','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'update-roles','guard_name' => 'my-roles','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'destroy-roles','guard_name' => 'my-roles','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'export-roles','guard_name' => 'my-roles','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'getPermissionsByRole-roles','guard_name' => 'my-roles','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'my-permissions','guard_name' => 'root','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'store-permissions','guard_name' => 'my-permissions','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'index-permissions','guard_name' => 'my-permissions','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'show-permissions','guard_name' => 'my-permissions','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'update-permissions','guard_name' => 'my-permissions','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'destroy-permissions','guard_name' => 'my-permissions','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'export-permissions','guard_name' => 'my-permissions','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'setUnsetPermissionToRole-permissions','guard_name' => 'my-permissions','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'delete_gallery-users','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'my-login','guard_name' => 'root','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

            array('name' => 'changePassword-logincontroller','guard_name' => 'my-login','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'logout-logincontroller','guard_name' => 'my-login','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'deleteAll-countries','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'deleteAll-states','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'deleteAll-cities','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'deleteAll-roles','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'deleteAll-hobbies','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),
            array('name' => 'deleteAll-permissions','guard_name' => 'my-users','created_at' => date('Y-m-d H:i:s'),'updated_at' => date('Y-m-d H:i:s')),

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
