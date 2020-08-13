<?php

namespace App\Http\Controllers\API\User;
use App\Exports\UsersExport;
use App\Http\Requests\User\LoginRequest;
use App\User;
use App\Models\User\UserGallery;
use App\Models\User\UserHobby;
use App\Http\Requests\User\UsersRequest;
use App\Http\Resources\User\UsersCollection;
use App\Http\Resources\User\UsersResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Maatwebsite\Excel\Facades\Excel;


class UsersAPIController extends Controller
{

    /***
     * Register New User
     * @param UsersRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UsersRequest $request)
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
                UserHobby::create([
                    'user_id' => $user->id,
                    'hobby_id' => $hobby
                ]);
            }
        }

        $user->sendEmailVerificationNotification();
        return response()->json(['success' => config('constants.messages.registration_success')],200);
    }

    /**
     * List All Users
     * @param Request $request
     * @return UsersCollection
     */
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(User::class,$request);
        return new UsersCollection(UsersResource::collection($query),UsersResource::class);
    }

    /**
     * Users detail
     * @param User $user
     * @return UsersResource
     */
    public function show(User $user)
    {
        return new UsersResource($user->load([]));
    }

    /**
     * Update Users
     * @param UsersRequest $request
     * @param User $user
     * @return UsersResource
     */
    public function update(UsersRequest $request, User $user)
    {
        $user->update($request->all());

        return new UsersResource($user);
    }

    /**
     * Delete User
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request, User $user)
    {
        $user->delete();

        return response()->json(['success' => config('constants.messages.delete_success')],200);
    }

    /**
     * Export Users Data
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(Request $request)
    {
        return Excel::download(new UsersExport($request), 'User.csv');
    }
}
