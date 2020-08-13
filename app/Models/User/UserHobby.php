<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserHobby extends Model
{
    //
    protected $fillable = ['user_id', 'hobby_id'];

    public function gallery()
    {
        return $this->belongsTo('App\User');
    }
}
