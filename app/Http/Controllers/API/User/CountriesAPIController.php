<?php

namespace App\Http\Controllers\API\User;

use App\Exports\User\CountriesExport;
use App\Imports\User\CountriesImport;
use App\Http\Resources\DataTrueResource;
use App\User;
use App\Models\User\Country;
use App\Http\Requests\User\CountriesRequest;
use App\Http\Resources\User\CountriesCollection;
use App\Http\Resources\User\CountriesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class CountriesAPIController extends Controller
{
    /*
  |--------------------------------------------------------------------------
  | Countries Controller
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
     * list Countires
     * @param Request $request
     * @return CountriesCollection
     */
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(Country::class,$request);
        return new CountriesCollection(CountriesResource::collection($query),CountriesResource::class);
    }

    /**
     * Country Detail
     * @param Country $country
     * @return CountriesResource
     */
    public function show(Country $country)
    {
        return new CountriesResource($country->load([]));
    }

    /**
     * Add Country
     * @param CountriesRequest $request
     * @return CountriesResource
     */
    public function store(CountriesRequest $request)
    {
        return new CountriesResource(Country::create($request->all()));
    }

    /**
     * Update Country
     * @param CountriesRequest $request
     * @param Country $country
     * @return CountriesResource
     */
    public function update(CountriesRequest $request, Country $country)
    {
        $country->update($request->all());

        return new CountriesResource($country);
    }

    /**
     * Delete Country
     * @param Request $request
     * @param Country $country
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request, Country $country)
    {
        $country->delete();

        return new DataTrueResource($country);
    }

    /**
     * Export Country Data
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(Request $request)
    {
        return Excel::download(new CountriesExport($request), 'country.csv');
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
            $import = new CountriesImport;
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
