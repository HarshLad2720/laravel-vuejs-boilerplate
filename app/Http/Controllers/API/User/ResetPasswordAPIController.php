<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ResetPasswordRequest;
use App\Http\Resources\DataTrueResource;
use App\Models\User\PasswordReset;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordAPIController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */
    /**
     * Reset Password
     * @param ResetPasswordRequest $request
     * @return DataTrueResource
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        //verify token
        $record = PasswordReset::where('token', $request->get('token'))->first();
        // change password if valid token
        if ($record) {
            //get user
            $user = User::where('email', $record->email)->first();
            //change password
            $user->password = bcrypt($request->password);
            $user->update();
            //remove token
            $record->delete();
            return new DataTrueResource($user);
        } else {
            return User::GetError(config('constants.messages.user.invalid_token'));
        }
    }
}
