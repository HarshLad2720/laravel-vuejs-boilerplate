<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserGallery extends Model
{
    public $table = 'user_gallery';
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'filename'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function gallery()
    {
        return $this->belongsTo('App\User');
    }
}
