<?php

namespace App\Http\Controllers\API;

use App\Permission;
use App\Http\Resources\PermissionsCollection;
use App\Http\Resources\PermissionsResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PermissionsAPIController extends Controller
{
    public function index()
    {
        return new PermissionsCollection(Permission::paginate());
    }

    public function show(Permission $permissions)
    {
        return new PermissionsResource($permissions->load([]));
    }

    public function store(Request $request)
    {
        return new PermissionsResource(Permission::create($request->all()));
    }

    public function update(Request $request, Permission $permissions)
    {
        $permissions->update($request->all());

        return new PermissionsResource($permissions);
    }

    public function destroy(Request $request, Permission $permissions)
    {
        $permissions->delete();

        return response()->noContent();
    }
}
