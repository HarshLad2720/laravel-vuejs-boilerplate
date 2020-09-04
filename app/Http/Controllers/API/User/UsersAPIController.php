<?php

namespace App\Http\Controllers\API\User;
use App\Exports\User\UsersExport;
use App\Http\Resources\DataTrueResource;
use App\Imports\User\UsersImport;
use App\User;
use App\Models\User\UserGallery;
use App\Http\Requests\User\UsersRequest;
use App\Http\Resources\User\UsersCollection;
use App\Http\Resources\User\UsersResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Traits\UploadTrait;
use URL;

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
class UsersAPIController extends Controller
{
    use UploadTrait;
    /***
     * Register New User
     * @param UsersRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UsersRequest $request)
    {
        return User::Register($request);
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
        return User::UpdateUser($request,$user);

    }

    /**
     * Delete User
     *
     * @param Request $request
     * @param User $user
     * @return DataTrueResource
     * @throws \Exception
     */
    public function destroy(Request $request, User $user)
    {
        $user->hobbies()->detach();

        Storage::deleteDirectory('/public/user/' . $user->id);
        UserGallery::where('user_id', $user->id)->delete();

        Storage::deleteDirectory('/public/user/' . $user->id);
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
        return User::deleteAll($request);
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
        $this->deleteOne('/public/user/' . $gallery->user_id . '/' . basename($gallery->filename));
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
        return User::importBulk($request,new UsersImport(),config('constants.models.user_model'),config('constants.import_dir_path.user_dir_path'));
    }

    /**
     * This is a batch request API
     *
     * @param Request $requestObj
     * @return \Illuminate\Http\JsonResponse
     */
    public function batchRequest(Request $requestObj)
    {
        $requests  = $requestObj->get('request');//get request
        $output = array();
        $cnt = 0;
        foreach ($requests as $request) {// foreach for all requests inside batch

            $request = (object) $request;// array request convert to object

            if($cnt == 10)// limit maximum call 10 requests
                break;

            $url = parse_url($request->url);

            //querystrings code
            $query = array();
            if (isset($url['query'])) {
                parse_str($url['query'], $query);
            }

            $server = ['HTTP_HOST'=> preg_replace('#^https?://#', '', URL::to('/')), 'HTTPS' => 'on'];
            $req = Request::create($request->url, 'GET', $query, [],[], $server);// set request

            $req->headers->set('Accept', 'application/json');//set accept header
            $res = app()->handle($req);//call request

            if (isset($request->request_id)) {// check request_id is set or not
                $output[$request->request_id] = json_decode($res->getContent()); // get response and set into output array
            } else {
                $output[] = $res;
            }

            $cnt++;// request counter
        }

        return response()->json(array('response' => $output));// return batch response
    }

}
