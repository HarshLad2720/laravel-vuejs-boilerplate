<?php

namespace App\Http\Controllers\API\User;

use App\Exports\User\CountriesExport;
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

        return response()->json(['success' => config('constants.messages.delete_success')],200);
    }

    /**
     * Export Country Data
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(Request $request)
    {
        return Excel::download(new CountriesExport($request), 'User.csv');
    }
}
