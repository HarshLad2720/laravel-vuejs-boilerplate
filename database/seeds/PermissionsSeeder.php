<?php

use App\Models\User\Permission;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        factory(Permission::class, 10)->create();

        DB::table('permissions')->insert(array(

            array('name' => 'my-users','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'index-users','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'show-users','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'update-users','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'destroy-users','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'export-users','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'importBulk-users','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'my-countries','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'store-countries','guard_name' => 'my-countries','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'index-countries','guard_name' => 'my-countries','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'show-countries','guard_name' => 'my-countries','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'update-countries','guard_name' => 'my-countries','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'destroy-countries','guard_name' => 'my-countries','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'export-countries','guard_name' => 'my-countries','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'importBulk-countries','guard_name' => 'my-countries','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'my-states','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'store-states','guard_name' => 'my-states','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'index-states','guard_name' => 'my-states','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'show-states','guard_name' => 'my-states','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'update-states','guard_name' => 'my-states','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'destroy-states','guard_name' => 'my-states','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'export-states','guard_name' => 'my-states','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'importBulk-states','guard_name' => 'my-states','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'my-cities','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'store-cities','guard_name' => 'my-cities','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'index-cities','guard_name' => 'my-cities','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'show-cities','guard_name' => 'my-cities','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'update-cities','guard_name' => 'my-cities','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'destroy-cities','guard_name' => 'my-cities','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'export-cities','guard_name' => 'my-cities','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'importBulk-cities','guard_name' => 'my-cities','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'my-hobbies','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'store-hobbies','guard_name' => 'my-hobbies','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'index-hobbies','guard_name' => 'my-hobbies','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'show-hobbies','guard_name' => 'my-hobbies','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'update-hobbies','guard_name' => 'my-hobbies','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'destroy-hobbies','guard_name' => 'my-hobbies','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'export-hobbies','guard_name' => 'my-hobbies','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'importBulk-hobbies','guard_name' => 'my-hobbies','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'my-roles','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'store-roles','guard_name' => 'my-roles','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'index-roles','guard_name' => 'my-roles','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'show-roles','guard_name' => 'my-roles','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'update-roles','guard_name' => 'my-roles','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'destroy-roles','guard_name' => 'my-roles','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'export-roles','guard_name' => 'my-roles','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'getPermissionsByRole-roles','guard_name' => 'my-roles','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'my-permissions','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'store-permissions','guard_name' => 'my-permissions','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'index-permissions','guard_name' => 'my-permissions','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'show-permissions','guard_name' => 'my-permissions','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'update-permissions','guard_name' => 'my-permissions','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'destroy-permissions','guard_name' => 'my-permissions','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'export-permissions','guard_name' => 'my-permissions','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'setUnsetPermissionToRole-permissions','guard_name' => 'my-permissions','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'delete_gallery-users','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'my-login','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'changePassword-logincontroller','guard_name' => 'my-login','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'logout-logincontroller','guard_name' => 'my-login','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'deleteAll-countries','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'deleteAll-states','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'deleteAll-cities','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'deleteAll-roles','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'deleteAll-hobbies','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'deleteAll-permissions','guard_name' => 'my-users','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'my-importcsvlogs','guard_name' => 'root','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

            array('name' => 'index-importcsvlogs','guard_name' => 'my-importcsvlogs','created_at' => Carbon::now(),'updated_at' => Carbon::now()),
            array('name' => 'show-importcsvlogs','guard_name' => 'my-importcsvlogs','created_at' => Carbon::now(),'updated_at' => Carbon::now()),

        ));
    }
}
