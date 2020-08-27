<?php
namespace App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Import_User_log extends Model
{
    use SoftDeletes;
    protected $table = 'import_user_logs';
    /**
     * @var array
     */

    protected $fillable = ['filename','error_log'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


}
