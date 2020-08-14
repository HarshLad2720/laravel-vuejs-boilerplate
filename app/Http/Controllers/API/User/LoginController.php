<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Requests\User\LoginRequest;
use \App\Http\Resources\User\UsersResource;

use App\Http\Requests\User\ChangePasswordRequest;
use App\User;
use App\Scopes\VerifiedScope;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Hash;

class LoginController extends Controller
{
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     */
    public function login(LoginRequest $request)
    {
        $user = User::withoutGlobalScope(VerifiedScope::class)
            ->where('email', $request->get('email'))
            ->first();

        if ((isset($user) && is_null($user->email_verified_at)) || (isset($user) && $user->status != config('constants.user.status_code.active'))) {
            return response()->json(['error' => config('constants.messages.login.unverified_account')]);
        }

        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'error' => config('constants.messages.user.invalid')
            ], config('constants.validation_codes.422'));
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if($user != null){
            //get User Permission and save permission in token
            $token->scopes = $user->role->permissions->pluck('permissions')->toArray();
            $token->save();
            $user->permissions = is_null($user->role)?[]:$user->role->permissions->pluck('permissions');
            $user->authorization = $tokenResult->accessToken;
            return new UsersResource($user);
        }else{
            return response("No User found.", 200);
        }

    }

    /**
     * Change user's password
     */
    public function changePassword(ChangePasswordRequest $request){
        //get all updated data.
        $data = $request->all();
        //change to main connection
        $masterUser = User::findorFail($request->user()->id);
        if ((Hash::check($data['old_password'], $masterUser->password)) == false) {
            return response()->json(['error' => config("constants.messages.invalid_old_password")],422);
        } else if ((Hash::check($data['new_password'], $masterUser->password)) == true) {
            return response()->json(['error' => 'Please enter a password which is not similar then current password.'],422);
        } else {
            if ($data['new_password']!= $data['confirm_password']) {
                return response()->json(['error' => 'New password is not match to confirm password.'],422);
            }
            else{
                User::where('id', $request->user()->id)->update(['password' => Hash::make($data['new_password'])]);
                return response()->json(['message' => config("constants.messages.password_changed")],200);

            }

        }

    }


}
