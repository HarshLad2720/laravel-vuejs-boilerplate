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

    /**
     * @param $value
     * @return \Illuminate\Contracts\Routing\UrlGenerator|string
     */
    public function getFilenameAttribute($value){
        if ($value == NULL)
            return "";
        return url(config('constants.image.dir_path') . $value);
    }
}
