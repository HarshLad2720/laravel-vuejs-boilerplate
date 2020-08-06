<?php

namespace App\Http\Controllers\API;

use App\Users;
use App\Http\Resources\UsersCollection;
use App\Http\Resources\UsersResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersAPIController extends Controller
{
    public function index()
    {
        return new UsersCollection(Users::paginate());
    }
 
    public function show(Users $users)
    {
        return new UsersResource($users->load([]));
    }

    public function store(Request $request)
    {
        return new UsersResource(Users::create($request->all()));
    }

    public function update(Request $request, Users $users)
    {
        $users->update($request->all());

        return new UsersResource($users);
    }

    public function destroy(Request $request, Users $users)
    {
        $users->delete();

        return response()->noContent();
    }
}
