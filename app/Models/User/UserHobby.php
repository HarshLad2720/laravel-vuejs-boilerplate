<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserHobby extends Model
{
    public $table = 'hobby_user';
    public $timestamps = false;
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'hobby_id'];

  /*  public function hobby()
    {
        return $this->belongsTo(UserHobby::class,'hobby_id');
    }*/

}
