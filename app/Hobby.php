<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hobby extends Model
{
    //
    protected $fillable = ['user_id', 'hobby_id'];

    public function hobby()
    {
        return $this->belongsTo('App\User');
    }
}
