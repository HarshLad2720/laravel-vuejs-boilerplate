<?php

namespace App\Http\Controllers\API\User;

use App\Exports\User\CitiesExport;
use App\Http\Resources\DataTrueResource;
use App\Imports\User\CitiesImport;
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function importBulk(Request $request)
    {
        if($request->hasfile('file')) {
            $path1 = $request->file('file')->store('temp');
            $path = storage_path('app') . '/' . $path1;
            $import = new CitiesImport;
            $data = \Excel::import($import, $path);

            if (count($import->getErrors()) > 0) {
                return response()->json(['errors' => $import->getErrors()], 422);
            }
            return response()->json(['success' => true]);
        }
        else{
            return response()->json(['errors' =>config('constants.messages.file_csv_error')], 422);
        }
    }
}
