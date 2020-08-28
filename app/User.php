<?php

namespace App;
use App\Http\Resources\DataTrueResource;
use App\Http\Resources\User\UsersResource;
use App\Imports\User\UsersImport;
use App\Models\User\Country;
use App\Models\User\Hobby;
use App\Models\User\Import_csv_log;
use App\Models\User\State;
use App\Models\User\City;
use App\Models\User\Role;
use App\Models\User\UserGallery;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\Scopes;
use Laravel\Passport\HasApiTokens;
use Maatwebsite\Excel\Facades\Excel;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable,Scopes,HasApiTokens;

    public function scopeCommonFunctionMethod($query,$model, $request, $preQuery = null, $tablename = null, $groupBy = null, $export_select = false, $no_paginate = false)
    {
        return $this->getCommonFunctionMethod($model, $request, $preQuery, $tablename , $groupBy , $export_select , $no_paginate);
    }

    public static function getCommonFunctionMethod($model, $request, $preQuery = null, $tablename = null, $groupBy = null, $export_select = false, $no_paginate = false)
    {
        if (is_null($preQuery)) {


            $mainQuery = $model::withSearch($request->get('search'), $export_select);
        }else {

            $mainQuery = $model->withSearch($request->get('search'), $export_select);
        }

        if($request->filled('filter') != '')
            $mainQuery = $mainQuery->withFilter($request->get('filter'));

        if(!is_null($groupBy))
            $mainQuery = $mainQuery->groupBy($groupBy);

        if ( $no_paginate ){

            return $mainQuery->withOrderBy($request->get('sort'), $request->get('order_by'), $tablename, $export_select);
        }else{
            return $mainQuery->withOrderBy($request->get('sort'), $request->get('order_by'), $tablename, $export_select)
                ->withPerPage($request->get('per_page'));
        }
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'email', 'password', 'mobile_no', 'role_id', 'profile', 'gender', 'dob', 'address','country_id','state_id','city_id', 'status', 'remember_token'
    ];

    /**
     * @var array
     */
    public $sortable=[
        'id','name'
    ];

    public $foreign_sortable = [
        'country_id','state_id','city_id'
    ];

    public $foreign_table = [
        'countries','states','cities'
    ];

    public $foreign_key = [
        'name','name','name'
    ];

    public $foreign_method = [
        'country','state','city'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['email_verified_at', 'created_at', 'updated_at'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        //
        'id'=>'string',
        'name'=>'string',
        'email'=>'string',
        'password'=>'string',
        'mobile_no'=>'string',
        'role_id'=>'string',
        'profile'=>'string',
        'gender'=>'string',
        'dob'=>'string',
        'address'=>'string',
        'country_id'=>'string',
        'state_id'=>'string',
        'city_id'=>'string',
        'status'=>'string',
        'email_verified_at'=>'string',
        'created_at'=>'string',
        'updated_at'=>'string',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country() {
        return $this->belongsTo(Country::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function state() {
        return $this->belongsTo(State::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function city() {
        return $this->belongsTo(City::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function user_galleries() {
        return $this->hasMany(UserGallery::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function hobbies() {
        return $this->belongsToMany(Hobby::class,"hobby_user","user_id","hobby_id");
    }

    /**
    * @param $value
    * @return \Illuminate\Contracts\Routing\UrlGenerator|string
    */
    public function getProfileAttribute($value){
        if ($value == NULL)
            return "";
        return url(config('constants.image.dir_path') . $value);
    }

    public function scopeRegister($query,$request){
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $data['role_id'] = config('constants.role.apply_role');
        $user = User::create($data);

        if($request->hasfile('profile')) {
            $real_path = 'user/' . $user->id . '/';
            $file_data = $request->file('profile')->store('/public/' . $real_path);
            $filename = $real_path . pathinfo($file_data, PATHINFO_BASENAME);
            $user->update(['profile' => $filename]);
        }

        if($request->hasfile('gallery')) {

            foreach ($request->gallery as $image) {
                $real_path = 'gallery/'.$user->id.'/';
                $file_data = $image->store('/public/' . $real_path);
                $filename = $real_path . pathinfo($file_data, PATHINFO_BASENAME);
                UserGallery::create([
                    'user_id' => $user->id,
                    'filename' => $filename
                ]);
            }
        }

        if($data['hobby']) {
            $user->hobbies()->attach($data['hobby']); //this executes the insert-query
        }

        $user->sendEmailVerificationNotification();
        return response()->json(['success' => config('constants.messages.registration_success')], config('constants.validation_codes.200'));
    }

    /**
     * Multiple Delete
     * @param $query
     * @param $request
     * @return DataTrueResource|\Illuminate\Http\JsonResponse
     */
    public function scopeDeleteAll($query,$request){
        if(!empty($request->id)) {
            User::whereIn('id', $request->id)->delete();
            return new DataTrueResource(true);
        }
        else{
            return response()->json(['error' =>config('constants.messages.delete_multiple_error')], config('constants.validation_codes.422'));
        }
    }

    /**
     * update User
     * @param $query
     * @param $request
     * @param $user
     * @return UsersResource
     */
    public function scopeUpdateUser($query,$request,$user){
        $data = $request->all();
        if($request->hasfile('profile')) {
            $real_path = 'user/' . $user->id . '/';
            $file_data = $request->file('profile')->store('/public/' . $real_path);
            $filename = $real_path . pathinfo($file_data, PATHINFO_BASENAME);
            $data['profile'] = $filename;
        }

        if($request->hasfile('gallery')) {

            foreach ($request->gallery as $image) {
                $real_path = 'gallery/'.$user->id.'/';
                $file_data = $image->store('/public/' . $real_path);
                $filename = $real_path . pathinfo($file_data, PATHINFO_BASENAME);
                UserGallery::create([
                    'user_id' => $user->id,
                    'filename' => $filename
                ]);
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
     * Import csv
     * @param $query
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function scopeImportBulk($query,$request)
    {
        if($request->hasfile('file')) {
            $path1 = $request->file('file')->store('temp');
            $path = storage_path('app') . '/' . $path1;
            $import = new UsersImport;
            $data = Excel::import($import, $path);
            if (count($import->getErrors()) > 0) {
                $file = $request->file('file')->getClientOriginalName();
                $error_jason = json_encode($import->getErrors());
                Import_csv_log::create([
                    'file_path' => $path1,
                    'filename' => $file,
                    'model_name' => config('constants.models.user_model'),
                    'error_log' => $error_jason
                ]);
                return response()->json(['errors' => $import->getErrors()], config('constants.validation_codes.422'));
            }
            return response()->json(['success' => true]);
        }
        else{
            return response()->json(['error' =>config('constants.messages.file_csv_error')], config('constants.validation_codes.422'));
        }
    }

}
