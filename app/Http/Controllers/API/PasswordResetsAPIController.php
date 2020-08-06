<?php

namespace App\Http\Controllers\API;

use App\PasswordReset;
use App\Http\Resources\PasswordResetsCollection;
use App\Http\Resources\PasswordResetsResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PasswordResetsAPIController extends Controller
{
    public function index()
    {
        return new PasswordResetsCollection(PasswordReset::paginate());
    }

    public function show(PasswordReset $passwordResets)
    {
        return new PasswordResetsResource($passwordResets->load([]));
    }

    public function store(Request $request)
    {
        return new PasswordResetsResource(PasswordReset::create($request->all()));
    }

    public function update(Request $request, PasswordReset $passwordResets)
    {
        $passwordResets->update($request->all());

        return new PasswordResetsResource($passwordResets);
    }

    public function destroy(Request $request, PasswordReset $passwordResets)
    {
        $passwordResets->delete();

        return response()->noContent();
    }
}
