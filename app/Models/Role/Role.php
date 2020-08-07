<?php

namespace App\Models\Role;

use App\Traits\Scopes;
use App\User;
use App\Models\Permission\Permission;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use Scopes,SoftDeletes;

    //public $timestamps = false;
    public $sortable=[
        'name','id'
    ];


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'guard_name', 'landing_page'
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
        //
    ];

    /**
     * Get the Users for the Role.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the Permissions for the Role.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class,"permission_roles","role_id","permission_id");
    }


}
