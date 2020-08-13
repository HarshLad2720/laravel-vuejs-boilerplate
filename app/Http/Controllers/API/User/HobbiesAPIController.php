<?php

namespace App\Http\Controllers\API\User;

use App\User;
use App\Models\User\Hobby;
use App\Http\Requests\User\HobbiesRequest;
use App\Http\Resources\User\HobbiesCollection;
use App\Http\Resources\User\HobbiesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HobbiesAPIController extends Controller
{
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(Hobby::class,$request);
        return new HobbiesCollection(HobbiesResource::collection($query),HobbiesResource::class);
    }

    public function show(Hobby $hobby)
    {
        return new HobbiesResource($hobby->load([]));
    }

    public function store(HobbiesRequest $request)
    {
        return new HobbiesResource(Hobby::create($request->all()));
    }

    public function update(HobbiesRequest $request, Hobby $hobby)
    {
        $hobby->update($request->all());

        return new HobbiesResource($hobby);
    }

    public function destroy(Request $request, Hobby $hobby)
    {
        $hobby->delete();

        return response()->json(['success' => config('constants.messages.delete_success')],200);
    }
}
