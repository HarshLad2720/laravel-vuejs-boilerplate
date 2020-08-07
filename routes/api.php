<?php

use Illuminate\Http\Request;
use Illuminate\Routing\Router;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
* Snippet for a quick route reference
*/
/*Route::get('/', function (Router $router) {
    return collect($router->getRoutes()->getRoutesByMethod()["GET"])->map(function($value, $key) {
        return url($key);
    })->values();
});*/

Route::group([
    'prefix' => 'v1',
], function () {

    Route::post('login','\App\Http\Controllers\API\user\UsersAPIController@login');
    Route::post('users', '\App\Http\Controllers\API\user\UsersAPIController@store');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {

        Route::apiResource('users', '\App\Http\Controllers\API\user\UsersAPIController', [
            'only' => ['index', 'show', 'update', 'destroy']
        ]);

        Route::apiResource('passwordResets', '\App\Http\Controllers\API\PasswordResetsAPIController');

        Route::apiResource('roles', '\App\Http\Controllers\API\Role\RolesAPIController');

        Route::apiResource('permissions', '\App\Http\Controllers\API\Permission\PermissionsAPIController');

        Route::put('permission_role/{role}', '\App\Http\Controllers\API\Role\RolesAPIController@permission_role');
    });





});
