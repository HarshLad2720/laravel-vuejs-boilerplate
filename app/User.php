<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Scopes;
use Illuminate\Support\Facades\Schema;

class User extends Authenticatable
{
    use Notifiable,Scopes;

    public function scopeCommonFunctionMethod($query,$model, $request, $preQuery = null, $tablename = null, $groupBy = null, $export_select = false, $no_paginate = false)
    {
        return $this->getCommonFunctionMethod($model, $request, $preQuery, $tablename , $groupBy , $export_select , $no_paginate);
    }

    public static function getCommonFunctionMethod($model, $request, $preQuery = null, $tablename = null, $groupBy = null, $export_select = false, $no_paginate = false)
    {
        if (is_null($preQuery)) {
            $model_name = new $model;
            $table = $model_name->getTable();
            $mainQuery = $model::withSearch($request->get('search'), $export_select);
        }else {
            $table = $model->getModel()->getTable();
            $mainQuery = $model->withSearch($request->get('search'), $export_select);
        }

        $clinic_id_exists = Schema::hasColumn($table, 'clinic_id');
        $patient_id_exists = Schema::hasColumn($table, 'patient_id');

        if($request->has('clinic_id') && $request->get('show_all_clinic') != "1" && !$request->has('show_all_branches') && $clinic_id_exists)
            $mainQuery = $mainQuery->where($table.'.clinic_id',$request->get('clinic_id'));

        if ( $request->has('patient_id') && $request->get('show_all_patient') != "1" && $patient_id_exists)
            $mainQuery = $mainQuery->where($table.'.patient_id',$request->get('patient_id'));

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
        'id', 'name', 'email', 'password', 'mobile_no', 'role_id', 'profile_image', 'gender', 'dob', 'city', 'address', 'status', 'remember_token'
    ];

    /**
     * @var array
     */
    public $sortable=[
        'id','name',
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
    ];
}
