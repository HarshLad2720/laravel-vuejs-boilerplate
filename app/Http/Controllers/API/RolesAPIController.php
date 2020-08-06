<?php

namespace App\Http\Controllers\API;

use App\Role;
use App\Http\Resources\RolesCollection;
use App\Http\Resources\RolesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RolesAPIController extends Controller
{
    public function index()
    {
        return new RolesCollection(Role::paginate());
    }

    public function show(Role $roles)
    {
        return new RolesResource($roles->load([]));
    }

    public function store(Request $request)
    {
        return new RolesResource(Role::create($request->all()));
    }

    public function update(Request $request, Role $roles)
    {
        $roles->update($request->all());

        return new RolesResource($roles);
    }

    public function destroy(Request $request, Role $roles)
    {
        $roles->delete();

        return response()->noContent();
    }
}
