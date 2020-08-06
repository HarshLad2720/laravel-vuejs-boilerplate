<?php

namespace App\Http\Controllers\API\user;

use App\User;
use App\Http\Requests\user\UsersRequest;
use App\Http\Resources\user\UsersCollection;
use App\Http\Resources\user\UsersResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersAPIController extends Controller
{
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(User::class,$request);
        return new UsersCollection(UsersResource::collection($query),UsersResource::class);
    }

    public function show(User $user)
    {
        return new UsersResource($user->load([]));
    }

    public function store(UsersRequest $request)
    {
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);
        $real_path = 'user/'.$user->id.'/';
        $file_data = $request->file('profile_image')->store('/public/' . $real_path);
        $user->profile_image = $real_path . pathinfo($file_data, PATHINFO_BASENAME);

        return new UsersResource($user);
    }

    public function update(UsersRequest $request, User $user)
    {
        $user->update($request->all());

        return new UsersResource($user);
    }

    public function destroy(Request $request, User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
