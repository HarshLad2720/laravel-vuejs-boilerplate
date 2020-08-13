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


Route::group([
    'prefix' => 'v1',
], function () {
    Route::get('email/verify/{id}', '\App\Http\Controllers\API\User\VerificationAPIController@verify')->name('verification.verify');
    Route::get('email/resend', '\App\Http\Controllers\API\User\VerificationAPIController@resend')->name('verification.resend');
    Route::post('password/email','\App\Http\Controllers\API\User\ForgotPasswordAPIController@sendResetLinkEmail');
    Route::post('reset-password','\App\Http\Controllers\API\User\ResetPasswordAPIController@resetPassword');

    Route::post('register', '\App\Http\Controllers\API\User\UsersAPIController@register');
    Route::post('login','\App\Http\Controllers\API\User\LoginController@login');

    Route::post('users', '\App\Http\Controllers\API\user\UsersAPIController@store');
    Route::apiResource('roles', '\App\Http\Controllers\API\user\RolesAPIController');
    Route::apiResource('permissions', '\App\Http\Controllers\API\user\PermissionsAPIController');
    Route::put('permission_role/{role}', '\App\Http\Controllers\API\user\RolesAPIController@permission_role');
    Route::get('users-export', '\App\Http\Controllers\API\User\UsersAPIController@export');

    Route::group([
        'middleware' => ['auth:api'],
    ], function() {
        // Change Password
        Route::post('change-password','\App\Http\Controllers\API\User\LoginController@changePassword');

    });

    Route::group([
        'middleware' => ['auth:api', 'check.permission'],
    ], function() {

        Route::apiResource('countries', '\App\Http\Controllers\API\User\CountriesAPIController');
        Route::get('countries-export', '\App\Http\Controllers\API\User\CountriesAPIController@export');

        Route::apiResource('states', '\App\Http\Controllers\API\User\StatesAPIController');
        Route::get('states-export', '\App\Http\Controllers\API\User\StatesAPIController@export');

        Route::apiResource('cities', '\App\Http\Controllers\API\User\CitiesAPIController');
        Route::get('cities-export', '\App\Http\Controllers\API\User\CitiesAPIController@export');

        Route::apiResource('hobbies', '\App\Http\Controllers\API\User\HobbiesAPIController');
        Route::get('hobbies-export', '\App\Http\Controllers\API\User\HobbiesAPIController@export');

        Route::post('users/{user}', '\App\Http\Controllers\API\User\UsersAPIController@update');
        Route::apiResource('users', '\App\Http\Controllers\API\User\UsersAPIController', [
            'only' => ['index', 'show', 'update', 'destroy']
        ]);
        Route::get('users-export', '\App\Http\Controllers\API\User\UsersAPIController@export');
    });

});
