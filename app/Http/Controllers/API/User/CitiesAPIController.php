<?php

namespace App\Http\Controllers\API\User;

use App\User;
use App\Models\User\City;
use App\Http\Requests\User\CitiesRequest;
use App\Http\Resources\User\CitiesCollection;
use App\Http\Resources\User\CitiesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CitiesAPIController extends Controller
{
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(City::class,$request);
        return new CitiesCollection(CitiesResource::collection($query),CitiesResource::class);
    }

    public function show(City $city)
    {
        return new CitiesResource($city->load([]));
    }

    public function store(CitiesRequest $request)
    {
        return new CitiesResource(City::create($request->all()));
    }

    public function update(CitiesRequest $request, City $city)
    {
        $city->update($request->all());

        return new CitiesResource($city);
    }

    public function destroy(Request $request, City $city)
    {
        $city->delete();

        return response()->json(['success' => config('constants.messages.delete_success')],200);
    }
}
