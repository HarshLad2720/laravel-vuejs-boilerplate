<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserHobby extends Model
{
    public $table = 'user_hobby';
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'hobby_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function hobby()
    {
        return $this->belongsTo('App\User');
    }
}
