<?php

namespace App\Http\Controllers\API;

use App\PermissionRole;
use App\Http\Resources\PermissionRolesCollection;
use App\Http\Resources\PermissionRolesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PermissionRolesAPIController extends Controller
{
    public function index()
    {
        return new PermissionRolesCollection(PermissionRole::paginate());
    }

    public function show(PermissionRole $permissionRoles)
    {
        return new PermissionRolesResource($permissionRoles->load([]));
    }

    public function store(Request $request)
    {
        return new PermissionRolesResource(PermissionRole::create($request->all()));
    }

    public function update(Request $request, PermissionRole $permissionRoles)
    {
        $permissionRoles->update($request->all());

        return new PermissionRolesResource($permissionRoles);
    }

    public function destroy(Request $request, PermissionRole $permissionRoles)
    {
        $permissionRoles->delete();

        return response()->noContent();
    }
}
