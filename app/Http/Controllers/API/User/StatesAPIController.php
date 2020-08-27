<?php

namespace App\Http\Controllers\API\User;

use App\Exports\User\StatesExport;
use App\Http\Resources\DataTrueResource;
use App\Imports\User\StatesImport;
use App\Models\User\Import_csv_log;
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

    /*
    |--------------------------------------------------------------------------
    | States Controller
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
     * Delete State multiple
     * @param Request $request
     * @return DataTrueResource
     */
    public function deleteAll(Request $request)
    {
        if(!empty($request->id)) {
            State::whereIn('id', $request->id)->delete();

            return new DataTrueResource(true);
        }
        else{
            return response()->json(['error' =>config('constants.messages.delete_multiple_error')], 422);
        }
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function importBulk(Request $request)
    {
        if($request->hasfile('file')) {
            $path1 = $request->file('file')->store('temp');
            $path = storage_path('app') . '/' . $path1;
            $import = new StatesImport;
            $data = \Excel::import($import, $path);

            if (count($import->getErrors()) > 0) {
                $file = $request->file('file')->getClientOriginalName();
                $error_jason = json_encode($import->getErrors());
                Import_csv_log::create([
                    'file_path' => $path1,
                    'filename' => $file,
                    'model_name' => config('constants.models.state_model'),
                    'error_log' => $error_jason
                ]);
                return response()->json(['errors' => $import->getErrors()], 422);
            }
            return response()->json(['success' => true]);
        }
        else{
            return response()->json(['errors' =>config('constants.messages.file_csv_error')], 422);
        }
    }
}
