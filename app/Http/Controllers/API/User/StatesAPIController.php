<?php

namespace App\Http\Controllers\API\User;

use App\Exports\User\StatesExport;
use App\Http\Resources\DataTrueResource;
use App\Imports\User\StatesImport;
use App\User;
use App\Models\User\State;
use App\Http\Requests\User\StatesRequest;
use App\Http\Resources\User\StatesCollection;
use App\Http\Resources\User\StatesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class StatesAPIController extends Controller
{
    /**
     * List States
     * @param Request $request
     * @return StatesCollection
     */
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(State::class,$request);
        return new StatesCollection(StatesResource::collection($query),StatesResource::class);
    }

    /**
     * States Detail
     * @param State $state
     * @return StatesResource
     */
    public function show(State $state)
    {
        return new StatesResource($state->load([]));
    }

    /**
     * Add State
     * @param StatesRequest $request
     * @return StatesResource
     */
    public function store(StatesRequest $request)
    {
        return new StatesResource(State::create($request->all()));
    }

    /**
     * Update State
     * @param StatesRequest $request
     * @param State $state
     * @return StatesResource
     */
    public function update(StatesRequest $request, State $state)
    {
        $state->update($request->all());

        return new StatesResource($state);
    }

    /**
     * Delete State
     * @param Request $request
     * @param State $state
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request, State $state)
    {
        $state->delete();

        return new DataTrueResource($state);
    }

    /**
     * Export States Data
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(Request $request)
    {
        return Excel::download(new StatesExport($request), 'state.csv');
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
            $import = new StatesImport;
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
