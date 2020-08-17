<?php

namespace App\Http\Controllers\API\User;

use App\Exports\User\HobbiesExport;
use App\Http\Resources\DataTrueResource;
use App\Imports\User\HobbiesImport;
use App\User;
use App\Models\User\Hobby;
use App\Http\Requests\User\HobbiesRequest;
use App\Http\Resources\User\HobbiesCollection;
use App\Http\Resources\User\HobbiesResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class HobbiesAPIController extends Controller
{
    /**
     * Hobbies List
     * @param Request $request
     * @return HobbiesCollection
     */
    public function index(Request $request)
    {
        $query = User::commonFunctionMethod(Hobby::class,$request);
        return new HobbiesCollection(HobbiesResource::collection($query),HobbiesResource::class);
    }

    /**
     * Hobby Detail
     * @param Hobby $hobby
     * @return HobbiesResource
     */
    public function show(Hobby $hobby)
    {
        return new HobbiesResource($hobby->load([]));
    }

    /**
     * Add Hobby
     * @param HobbiesRequest $request
     * @return HobbiesResource
     */
    public function store(HobbiesRequest $request)
    {
        return new HobbiesResource(Hobby::create($request->all()));
    }

    /**
     * Update Hobby
     * @param HobbiesRequest $request
     * @param Hobby $hobby
     * @return HobbiesResource
     */
    public function update(HobbiesRequest $request, Hobby $hobby)
    {
        $hobby->update($request->all());

        return new HobbiesResource($hobby);
    }

    /**
     * Delete Hobby
     * @param Request $request
     * @param Hobby $hobby
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request, Hobby $hobby)
    {
        $hobby->delete();

        return new DataTrueResource($hobby);
    }

    /**
     * Export Hobbies Data
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export(Request $request)
    {
        return Excel::download(new HobbiesExport($request), 'hobby.csv');
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
            $import = new HobbiesImport;
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
