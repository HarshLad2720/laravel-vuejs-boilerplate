<?php

namespace App\Http\Controllers\API\User;

use App\Exports\User\HobbiesExport;
use App\Http\Resources\DataTrueResource;
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

    /*
    |--------------------------------------------------------------------------
    | Hobbies Controller
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
     * Delete Hobby multiple
     * @param Request $request
     * @return DataTrueResource
     */
    public function deleteAll(Request $request)
    {
        return Hobby::DeleteAll($request);
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function importBulk(Request $request)
    {
        return Hobby::ImportBulk($request);
    }
}
