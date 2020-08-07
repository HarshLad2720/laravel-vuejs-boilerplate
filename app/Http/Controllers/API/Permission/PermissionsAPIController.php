<?php

namespace App\Http\Controllers\API\Permission;

use App\Models\Permission\Permission;
use App\Http\Resources\Permission\PermissionsCollection;
use App\Http\Resources\Permission\PermissionsResource;
use App\Http\Requests\Permission\PermissionRequest;
use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\Controller;

class PermissionsAPIController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Permission Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the Permissions of new Permissions.
    |
    */

    /**
    * Display a listing of the resource.
    */

    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(Permission::class,$request);
        return new PermissionsCollection(PermissionsResource::collection($query),PermissionsResource::class);
    }

    /**
     * Display the specified resource.
     *
     //* @param  \App\Permission  $permission
     //* @return \Illuminate\Http\Response
     */

    public function show(Permission $permission)
    {
        return new PermissionsResource($permission);
    }

    /**
     * Create a new Permission instance after a valid Permissions.
     *
     * @param  array  $request
     * @param  PermissionRequest
     //* @return Permission
     */

    public function store(PermissionRequest $request)
    {
        return new PermissionsResource(Permission::create($request->all()));
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(PermissionRequest $request, Permission $permission)
    {
        $permission->update($request->all());
        return new PermissionsResource($permission);
    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy(Request $request, Permission $permission)
    {
        $permission->delete();
        return response()->json(['data' => config('constants.messages.delete_sucess')]);
    }
}
