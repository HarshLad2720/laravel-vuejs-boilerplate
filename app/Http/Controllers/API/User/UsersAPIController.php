<?php

namespace App\Http\Controllers\API\User;
use App\Exports\User\UsersExport;
use App\Imports\User\UsersImport;
use App\Http\Resources\DataTrueResource;
use App\Models\User\Hobby_user;
use Illuminate\Filesystem\Filesystem;
use App\User;
use App\Models\User\UserGallery;
use App\Models\User\Import_csv_log;
use App\Http\Requests\User\UsersRequest;
use App\Http\Resources\User\UsersCollection;
use App\Http\Resources\User\UsersResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Support\Facades\Storage;
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
            $path = $this->uploadOne($request->file('profile'), '/user/'. $user->id);
            $user->update(['profile' => $path]);
        }

        if($request->hasfile('gallery')) {
            foreach ($request->file('gallery') as $photo) {
                $path = $this->uploadOne($photo,'/gallery/'. $user->id);
                UserGallery::create(['user_id' => $user->id, 'filename' => $path]);
            }
        }

        if($data['hobby']) {
            $user->hobbies()->attach($data['hobby']); //this executes the insert-query
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
            $this->deleteOne('/user/' . $user->id . '/' . basename($user->profile));
            $path = $this->uploadOne($request->file('profile'), '/user/'. $user->id);
            $user->update(['profile' => $path]);
        }

        if($request->hasfile('gallery')) {
            if($request->hasfile('gallery')) {
                foreach ($request->file('gallery') as $photo) {
                    $path = $this->uploadOne($photo,'/gallery/'. $user->id);
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
        $user->hobbies()->detach();

        Storage::deleteDirectory('/gallery/' . $user->id);
        UserGallery::where('user_id', $user->id)->delete();

        Storage::deleteDirectory('/user/' . $user->id);
        $user->delete();

        return new DataTrueResource($user);
    }

    /**
     * Delete User multiple
     * @param Request $request
     * @return DataTrueResource
     */
    public function deleteAll(Request $request)
    {
        if(!empty($request->id)) {
            User::whereIn('id', $request->id)->delete();

            return new DataTrueResource(true);
        } else{
            return response()->json(['error' =>config('constants.messages.delete_multiple_error')], 422);
        }
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

    /**
     * Delete gallery
     * @param Request $request
     * @param UserGallery $gallery
     * @return DataTrueResource
     * @throws \Exception
     */
    public function delete_gallery(Request $request, UserGallery $gallery)
    {
        $this->deleteOne('/gallery/' . $gallery->user_id . '/' . basename($gallery->filename));
        $gallery->delete();

        return new DataTrueResource($gallery);
    }

    /**
     * Import bulk
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function importBulk(Request $request)
    {
        if($request->hasfile('file')) {
            $path1 = $request->file('file')->store('temp');
            $path = storage_path('app') . '/' . $path1;
            $import = new UsersImport;
            $data = \Excel::import($import, $path);
            if (count($import->getErrors()) > 0) {
                $file = $request->file('file')->getClientOriginalName();
                $error_jason = json_encode($import->getErrors());
                Import_csv_log::create([
                    'file_path' => $path1,
                    'filename' => $file,
                    'model_name' => config('constants.models.user_model'),
                    'error_log' => $error_jason
                ]);
                return response()->json(['errors' => $import->getErrors()], 422);
            }
            return response()->json(['success' => true]);
        }
        else{
            return response()->json(['error' =>config('constants.messages.file_csv_error')], 422);
        }
    }

}
