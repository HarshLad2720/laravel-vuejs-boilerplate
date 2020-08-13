<?php

namespace App\Http\Controllers\API\User;

use App\User;
use App\Models\User\Country;
use App\Http\Requests\User\CountriesRequest;
use App\Http\Resources\User\CountriesCollection;
use App\Http\Resources\User\CountriesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CountriesAPIController extends Controller
{
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(Country::class,$request);
        return new CountriesCollection(CountriesResource::collection($query),CountriesResource::class);
    }

    public function show(Country $country)
    {
        return new CountriesResource($country->load([]));
    }

    public function store(CountriesRequest $request)
    {
        return new CountriesResource(Country::create($request->all()));
    }

    public function update(CountriesRequest $request, Country $country)
    {
        $country->update($request->all());

        return new CountriesResource($country);
    }

    public function destroy(Request $request, Country $country)
    {
        $country->delete();

        return response()->json(['success' => config('constants.messages.delete_success')],200);
    }
}
