<?php

namespace App\Models\User;
use App\Traits\Scopes;
use App\Traits\CreatedbyUpdatedby;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use SoftDeletes, Scopes,CreatedbyUpdatedby;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $sortable=[
        'id','name',
    ];

    /**
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'created_by','updated_by'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        //
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        //
        'id'=>'string',
        'name'=>'string'
    ];


}
