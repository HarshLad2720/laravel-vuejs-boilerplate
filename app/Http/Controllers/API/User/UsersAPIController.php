<?php

namespace App\Http\Controllers\API\User;
use App\Exports\User\UsersExport;
use App\Http\Resources\DataTrueResource;
use App\User;
use App\Models\User\UserGallery;
use App\Http\Requests\User\UsersRequest;
use App\Http\Resources\User\UsersCollection;
use App\Http\Resources\User\UsersResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Traits\UploadTrait;


class UsersAPIController extends Controller
{

    use UploadTrait;
    /*
   |--------------------------------------------------------------------------
   | Users Controller
   |--------------------------------------------------------------------------
   |
   | This controller handles the Roles of
       register,
       index,
       show,
       store,
       update,
       destroy,
       export Methods.
   |
   */

    /***
     * Register New User
     * @param UsersRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UsersRequest $request)
    {
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $data['role_id'] = config('constants.role.apply_role');
        $user = User::create($data);

        if($request->hasfile('profile')) {
            $path = $this->uploadOne($request->file('profile'), '/public/user/'. $user->id);
            $user->update(['profile' => $path]);
        }

        if($request->hasfile('gallery')) {
            foreach ($request->file('gallery') as $photo) {
                $path = $this->uploadOne($photo,'/public/gallery/'. $user->id);
                UserGallery::create(['user_id' => $user->id, 'filename' => $path]);
            }
        }

        if($data['hobby']) {
            $user->hobbies()->attach($data['hobby']);
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
        $data = $request->except(['profile']);
        if($request->hasfile('profile')) {
            $this->deleteOne([$user->profile]);
            $path = $this->uploadOne($request->file('profile'), '/public/user/'. $user->id);
            $user->update(['profile' => $path]);
        }

        if($request->hasfile('gallery')) {
            $ids = $paths = [];
            foreach ($user->user_galleries as $user_galleries) {
                $ids[] = $user_galleries->id;
                $paths[] = $user_galleries->filename;
            }
            UserGallery::destroy($ids);
            $this->deleteOne($paths);

            if($request->hasfile('gallery')) {
                foreach ($request->file('gallery') as $photo) {
                    $path = $this->uploadOne($photo,'/public/gallery/'. $user->id);
                    UserGallery::create(['user_id' => $user->id, 'filename' => $path]);
                }
            }
        }

        if($data['hobby']) {
            $user->hobbies()->detach(); //this executes the delete-query
            $user->hobbies()->attach($data['hobby']); //this executes the insert-query
        }
        $user->update($data);
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
        return new DataTrueResource($user);
    }

    /**
     * Export Users Data
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(Request $request)
    {
        return Excel::download(new UsersExport($request), 'user.csv');
    }
}
