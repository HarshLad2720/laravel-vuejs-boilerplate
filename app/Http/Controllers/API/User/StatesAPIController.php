<?php

namespace App\Http\Controllers\API\User;

use App\User;
use App\Models\User\State;
use App\Http\Requests\User\StatesRequest;
use App\Http\Resources\User\StatesCollection;
use App\Http\Resources\User\StatesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StatesAPIController extends Controller
{
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(State::class,$request);
        return new StatesCollection(StatesResource::collection($query),StatesResource::class);
    }

    public function show(State $state)
    {
        return new StatesResource($state->load([]));
    }

    public function store(StatesRequest $request)
    {
        return new StatesResource(Countries::create($request->all()));
    }

    public function update(StatesRequest $request, State $state)
    {
        $state->update($request->all());

        return new StatesResource($state);
    }

    public function destroy(Request $request, State $state)
    {
        $state->delete();

        return response()->json(['success' => config('constants.messages.delete_success')],200);
    }
}
