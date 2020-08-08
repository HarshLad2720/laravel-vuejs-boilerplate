<?php

namespace App\Http\Controllers\Api\user;

use App\Http\Requests\user\LoginRequest;
use App\User;
use App\Scopes\VerifiedScope;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

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

        if ((isset($user) && is_null($user->email_verified_at)) || (isset($user) && $user->status != config('constants.register.status.approved'))) {
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
            $user->authorization_secret_key = $tokenResult->accessToken;
            return new \App\Http\Resources\user\UsersResource($user);
        }else{
            return response("No User found.", 200);
        }

    }


}
