<?php

namespace App\Http\Controllers\API\User;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ForgotPasswordAPIController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    protected function validateEmail()
    {
        return [
            'email' => 'required|exists:users,email'
        ];
    }

    /**
     * Forgot password reset link success response
     * @param Request $request
     * @param $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkResponse(Request $request,$response)
    {
        return response()->json(['success' => config('constants.messages.forgotpassword_success')],200);
    }

    /**
     * Forgot password reset link fail response
     * @param Request $request
     * @param $response
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        if ($request->wantsJson()) {
            throw ValidationException::withMessages([
                'email' => [trans($response)],
            ]);
        }

       /* return back()
            ->withInput($request->only('email'))
            ->withErrors(['email' => trans($response)]);*/
        return response()->json(['error' => trans($response)], 422);
    }
}
