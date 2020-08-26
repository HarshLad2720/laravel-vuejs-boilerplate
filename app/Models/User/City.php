<?php

namespace App\Models\User;
use App\Traits\Scopes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class City extends Model
{
    use SoftDeletes, Scopes;

    /**
     * @var array
     */
    protected $fillable = [
        'id', 'name','state_id'
    ];

    /**
     * @var array
     */
    public $sortable=[
        'id','name','state_id'
    ];

    /**
     * @var array
     */
    public $foreign_sortable = [
        'state_id'
    ];

    /**
     * @var array
     */
    public $foreign_table = [
        'states'
    ];

    /**
     * @var array
     */
    public $foreign_key = [
        'name'
    ];

    /**
     * @var array
     */
    public $foreign_method = [
        'state'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

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
        'id'=>'string',
        'state_id'=>'string',
        'name'=>'string',
    ];

    public function state() {
        return $this->belongsTo(State::class);
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $user = Auth::user();
            $model->created_by = $user->id;
            $model->updated_by = $user->id;
        });
        static::updating(function($model)
        {
            $user = Auth::user();
            $model->updated_by = $user->id;
        });
    }


}
