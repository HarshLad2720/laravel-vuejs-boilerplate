<?php

namespace App\Http\Controllers\API\user;

use App\Models\user\Role;
use App\User;
use App\Http\Requests\user\RolesRequest;
use App\Http\Resources\user\RolesCollection;
use App\Http\Resources\user\RolesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RolesAPIController extends Controller
{
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(Role::class,$request);
        return new RolesCollection(RolesResource::collection($query),RolesResource::class);
    }

    public function show(Role $role)
    {
        return new RolesResource($role->load([]));
    }

    public function store(RolesRequest $request)
    {
        return new RolesResource(Role::create($request->all()));
    }

    public function update(RolesRequest $request, Role $role)
    {
        $role->update($request->all());

        return new RolesResource($role);
    }

    public function destroy(Request $request, Role $role)
    {
        $role->delete();
        return response()->json(['data' => config('constants.messages.delete_sucess')], 200);
    }

    public function permission_role(Request $request, Role $role){
        $role->permissions()->detach();
        $role->permissions()->attach($request->get('permissions'));
        return response()->json(['data' => config('constants.messages.apply_permissions')]);
    }
}
