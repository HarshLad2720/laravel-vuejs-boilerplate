<?php

namespace App\Http\Controllers\API\User;

use App\Exports\User\CitiesExport;
use App\Http\Resources\DataTrueResource;
use App\Imports\User\CitiesImport;
use App\Models\User\Import_csv_log;
use App\User;
use App\Models\User\City;
use App\Http\Requests\User\CitiesRequest;
use App\Http\Resources\User\CitiesCollection;
use App\Http\Resources\User\CitiesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class CitiesAPIController extends Controller
{

    /*
   |--------------------------------------------------------------------------
   | Cities Controller
   |--------------------------------------------------------------------------
   |
   | This controller handles the Roles of
     index,
     show,
     store,
     update,
     destroy,
     export and
     importBulk Methods.
   |
   */

    /**
     * list Cities
     * @param Request $request
     * @return CitiesCollection
     */
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(City::class,$request);
        return new CitiesCollection(CitiesResource::collection($query),CitiesResource::class);
    }

    /**
     * City Detail
     * @param City $city
     * @return CitiesResource
     */
    public function show(City $city)
    {
        return new CitiesResource($city->load([]));
    }

    /**
     * add City
     * @param CitiesRequest $request
     * @return CitiesResource
     */
    public function store(CitiesRequest $request)
    {
        return new CitiesResource(City::create($request->all()));
    }

    /**
     * Update City
     * @param CitiesRequest $request
     * @param City $city
     * @return CitiesResource
     */
    public function update(CitiesRequest $request, City $city)
    {
        $city->update($request->all());

        return new CitiesResource($city);
    }

    /**
     * Delete City
     * @param Request $request
     * @param City $city
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request, City $city)
    {
        $city->delete();

        return new DataTrueResource($city);
    }

    /**
     * Delete City multiple
     * @param Request $request
     * @return DataTrueResource
     */
    public function deleteAll(Request $request)
    {
        if(!empty($request->id)) {
            City::whereIn('id', $request->id)->delete();

            return new DataTrueResource(true);
        }
        else{
            return response()->json(['error' =>config('constants.messages.delete_multiple_error')], 422);
        }
    }

    /**
     * Export City Data
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(Request $request)
    {
        return Excel::download(new CitiesExport($request), 'city.csv');
    }

    /**
     * Import bulk
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function importBulk(Request $request)
    {
        if($request->hasfile('file')) {
            $path1 = $request->file('file')->store('temp');
            $path = storage_path('app') . '/' . $path1;
            $import = new CitiesImport;
            $data = Excel::import($import, $path);

            if (count($import->getErrors()) > 0) {
                $file = $request->file('file')->getClientOriginalName();
                $error_jason = json_encode($import->getErrors());
                Import_csv_log::create([
                    'file_path' => $path1,
                    'filename' => $file,
                    'model_name' => config('constants.models.city_model'),
                    'error_log' => $error_jason
                ]);
                return response()->json(['errors' => $import->getErrors()], 422);
            }
            return response()->json(['success' => true]);
        }
        else{
            return response()->json(['error' =>config('constants.messages.file_csv_error')], 422);
        }
    }
}
