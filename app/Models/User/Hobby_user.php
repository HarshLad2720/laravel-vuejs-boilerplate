<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Hobby_user extends Model
{
    public $table = 'hobby_user';
    public $timestamps = false;
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'hobby_id'];


}
