<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserGallery extends Model
{
    //
    protected $fillable = ['user_id', 'filename'];

    public function gallery()
    {
        return $this->belongsTo('App\User');
    }
}
