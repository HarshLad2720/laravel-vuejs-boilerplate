<?php

namespace App\Http\Controllers\API\User;

use App\Models\User\Permission;
use App\Http\Resources\User\PermissionsCollection;
use App\Http\Resources\User\PermissionsResource;
use App\Http\Requests\User\PermissionsRequest;
use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\DataTrueResource;
use App\Http\Controllers\Controller;

class PermissionsAPIController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Permission Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the Permissions of index, show, store, update, destroy Methods.
    |
    */

    /**
     * Permissions List
     * @param Request $request
     * @return PermissionsCollection
     * @return PermissionsResource
     */

    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(Permission::class,$request);
        return new PermissionsCollection(PermissionsResource::collection($query),PermissionsResource::class);
    }

    /**
     * Permission Detail
     * @param Permission $permission
     * @return PermissionsResource
     */

    public function show(Permission $permission)
    {
        return new PermissionsResource($permission);
    }

    /**
     * Create a new Permission instance after a valid Permission.
     * @param PermissionsRequest $request
     * @return PermissionsResource
     */

    public function store(PermissionsRequest $request)
    {
        return new PermissionsResource(Permission::create($request->all()));
    }

    /**
     * Update Permission
     * @param PermissionsRequest $request
     * @param Permission $permission
     * @return PermissionsResource
     */

    public function update(PermissionsRequest $request, Permission $permission)
    {
        $permission->update($request->all());
        return new PermissionsResource($permission);
    }

    /**
    * Delete Role
    * @param Request $request
    * @param Permission $permission
    * @return DataTrueResource
    */

    public function destroy(Request $request, Permission $permission)
    {
        $permission->delete();
        return new DataTrueResource($permission);
    }
}
