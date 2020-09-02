<?php

namespace App\Models\User;
use App\Http\Resources\DataTrueResource;
use App\Imports\User\CitiesImport;
use App\Traits\CreatedbyUpdatedby;
use App\Traits\Scopes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Maatwebsite\Excel\Facades\Excel;

class City extends Model
{
    use SoftDeletes, Scopes,CreatedbyUpdatedby;

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
        'id','name'
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function state() {
        return $this->belongsTo(State::class);
    }

    /**
     * Multiple Delete
     * @param $query
     * @param $request
     * @return DataTrueResource|\Illuminate\Http\JsonResponse
     */
    public function scopeDeleteAll($query,$request){
        if(!empty($request->id)) {
            City::whereIn('id', $request->id)->delete();

            return new DataTrueResource(true);
        }
        else{
            return response()->json(['error' =>config('constants.messages.delete_multiple_error')], config('constants.validation_codes.422'));
        }
    }

    /**
     * Import csv
     * @param $query
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function scopeImportBulk($query,$request){
        if($request->hasfile('file')) {
            $path1 = $request->file('file')->store('temp');
            $path = storage_path('app') . '/' . $path1;
            $import = new CitiesImport;
            $data = Excel::import($import, $path);

            if (count($import->getErrors()) > 0) {
                $file = $request->file('file')->getClientOriginalName();
                $error_json = json_encode($import->getErrors());
                Import_csv_log::create([
                    'file_path' => $path1,
                    'filename' => $file,
                    'model_name' => config('constants.models.city_model'),
                    'error_log' => $error_json
                ]);
                return response()->json(['errors' => $import->getErrors()], config('constants.validation_codes.422'));
            }
            return response()->json(['success' => true]);
        }
        else{
            return response()->json(['error' =>config('constants.messages.file_csv_error')], config('constants.validation_codes.422'));
        }
    }


}
