<?php

namespace App\Http\Controllers\API\User;

use App\Models\User\Role;
use App\Models\User\Permission;
use App\User;
use App\Http\Requests\User\RolesRequest;
use App\Http\Resources\User\RolesCollection;
use App\Http\Resources\User\RolesResource;
use Illuminate\Http\Request;
use App\Http\Resources\DataTrueResource;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\User\RolesExport;

class RolesAPIController extends Controller
{

    /*
   |--------------------------------------------------------------------------
   | Roles Controller
   |--------------------------------------------------------------------------
   |
   | This controller handles the Roles of index, show, store, update, destroy and export Methods.
   |
   */

    /**
    * Roles List
    * @param Request $request
     * @return RolesCollection
     * @return RolesResource
    */

    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(Role::class,$request);
        return new RolesCollection(RolesResource::collection($query),RolesResource::class);
    }

    /**
    * Role Detail
    * @param Role $role
    * @return RolesResource
    */

    public function show(Role $role)
    {
        return new RolesResource($role->load([]));
    }

    /**
     * Create a new Role instance after a valid Role.
     * @param RolesRequest $request
     * @return RolesResource
     */

    public function store(RolesRequest $request)
    {
        return new RolesResource(Role::create($request->all()));
    }

    /**
     * Update Role
     * @param RolesRequest $request
     * @param Role $role
     * @return RolesResource
     */

    public function update(RolesRequest $request, Role $role)
    {
        $role->update($request->all());

        return new RolesResource($role);
    }

    /**
    * Delete Role
    * @param Request $request
    * @param Role $role
    * @return DataTrueResource
    */

    public function destroy(Request $request, Role $role)
    {
        $role->delete();
        return new DataTrueResource($role);
    }

    /**
     * Export Roles Data
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(Request $request)
    {
        return Excel::download(new RolesExport($request), 'role.csv');
    }

    /**
     * Role Detail
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPermissionsByRole(Request $request)
    {
        //return new RolesResource($role->load([]));
        $role = Role::findorfail($request->id);//get role details
        $allPermission = Permission::getPermissions($role);
        return response()->json(['data' => $allPermission]);
    }

}
