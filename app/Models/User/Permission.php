<?php

namespace App\Models\User;

use App\Traits\Scopes;
use App\Models\User\role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use Scopes,SoftDeletes;

    public $sortable=[
        'permissions',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'permissions'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at'];

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
        'id'=>'string',
        'permissions'=>'string',
    ];

    /**
     * Get the Roles for the Permission.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class,"permission_roles","permission_id","role_id");
    }

}
