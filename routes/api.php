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
Auth::routes(['verify' => true]);

Route::get('email/verify/{id}', '\App\Http\Controllers\Auth\VerificationController@verify')->name('verification.verify');
Route::get('email/resend', '\App\Http\Controllers\Auth\VerificationController@resend')->name('verification.resend');

Route::post('users/{id}', '\App\Http\Controllers\API\user\UsersAPIController@update');

Route::apiResource('users', '\App\Http\Controllers\API\user\UsersAPIController');

Route::apiResource('passwordResets', '\App\Http\Controllers\API\PasswordResetsAPIController');

Route::apiResource('roles', '\App\Http\Controllers\API\RolesAPIController');

Route::apiResource('permissions', '\App\Http\Controllers\API\PermissionsAPIController');

Route::apiResource('permissionRoles', '\App\Http\Controllers\API\PermissionRolesAPIController');
