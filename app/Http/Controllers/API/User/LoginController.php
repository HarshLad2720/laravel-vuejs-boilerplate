<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Requests\User\LoginRequest;
use \App\Http\Resources\User\UsersResource;

use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Resources\DataTrueResource;

use App\User;
use App\Models\User\Role;
use App\Models\User\Permission;
use App\Scopes\VerifiedScope;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Hash;

class LoginController extends Controller
{

    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the User login and Change Password Functionality.
    |
    */

    /**
     * Login user and create token
     * @param LoginRequest $request
     //* @return UsersResource
     //* @return \Illuminate\Http\JsonResponse
     //* @throws \Exception
     */
    public function login(LoginRequest $request)
    {
        $user = User::withoutGlobalScope(VerifiedScope::class)
            ->where('email', $request->get('email'))
            ->first();

        if ((isset($user) && $user->status != config('constants.user.status_code.active'))) {
            return response()->json(['error' => config('constants.messages.login.unverified_account')],422);
        }

        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'error' => config('constants.messages.user.invalid')
            ], config('constants.validation_codes.422'));
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $user->permissions = [];
        if($user != null){
            //get User Permission and save permission in token
            $token->scopes = $user->role->permissions->pluck('name')->toArray();
            $token->save();
            $role = Role::findorfail($user->role_id);//get role details
            $user->permissions = Permission::getPermissions($role,$isSubscription = true);
            $user->authorization = $tokenResult->accessToken;
            return new UsersResource($user);
        }else{
            return response("No User found.", 422 );
        }

    }

    /**
     * change password functionality.
     *
     * @param ChangePasswordRequest $request
     * @return DataTrueResource|\Illuminate\Http\JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        //get all updated data.
        $data = $request->all();
        $masterUser = User::where('email', $request->user()->email)->first();
        if (Hash::check($data['old_password'], $masterUser->password)) {
            $masterData['password'] = bcrypt($data['new_password']);
            //update user password in master user table
            if ($masterUser->update($masterData)) {
                return new DataTrueResource($masterUser);
            }else
                return response()->json(['error' => config("constants.messages.something_wrong")],422);
        } else {
            return response()->json(['error' => config("constants.messages.invalid_old_password")],422);
        }
    }

    /**
     * Logout User
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public static function logout(Request $request) {
        $token = $request->user()->token();
        $token->revoke();
        return response()->json('You have been Successfully logged out!');
    }

}
