<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;


class VerificationAPIController extends Controller
{


    /*
    |--------------------------------------------------------------------------
    | Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling verify and resend requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    /**
     * Email Verification
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(Request $request) {
        $userID = $request['id'];
        $user = User::find($userID);
        $date = date("Y-m-d g:i:s");
        $user->email_verified_at = $date; // to enable the “email_verified_at field of that user be a current time stamp user must verify email feature
        $user->status = config('constants.user.status_code.active');
        $user->save();

        return redirect('home');

    }

    /**
     * Resend the email verification notification.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json('User already have verified email!', 422);
        }
        $request->user()->sendEmailVerificationNotification();
        return response()->json('The notification has been resubmitted');
    }
}
