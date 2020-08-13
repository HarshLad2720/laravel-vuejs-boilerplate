<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserHobby extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'hobby_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function gallery()
    {
        return $this->belongsTo('App\User');
    }
}
