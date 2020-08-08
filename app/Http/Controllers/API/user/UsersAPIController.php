<?php

namespace App\Http\Controllers\API\user;

use App\Http\Requests\user\LoginRequest;
use App\User;
use App\UserGallery;
use App\Hobby;
use App\Http\Requests\user\UsersRequest;
use App\Http\Resources\user\UsersCollection;
use App\Http\Resources\user\UsersResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Support\Facades\Auth;

class UsersAPIController extends Controller
{

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(LoginRequest $request)
    {
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

        if($request->hasfile('profile')) {
            $real_path = 'user/' . $user->id . '/';
            $file_data = $request->file('profile')->store('/public/' . $real_path);
            $user->profile = $real_path . pathinfo($file_data, PATHINFO_BASENAME);
        }

        if($request->hasfile('gallery')) {

            foreach ($request->gallery as $photo) {
                $real_path = 'gallery/'.$user->id.'/';
                $file_data = $photo->store('/public/' . $real_path);
                $filename = $real_path . pathinfo($file_data, PATHINFO_BASENAME);
                UserGallery::create([
                    'user_id' => $user->id,
                    'filename' => $filename
                ]);
            }
        }

        if($data['hobby']) {

            foreach ($data['hobby'] as $hobby) {
                Hobby::create([
                    'user_id' => $user->id,
                    'hobby_id' => $hobby
                ]);
            }
        }

        $user->sendEmailVerificationNotification();
        $success['message'] = 'Please check your inbox to activate your account.';

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
