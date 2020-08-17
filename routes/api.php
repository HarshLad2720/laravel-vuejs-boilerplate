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
    'namespace' => 'API',
], function () {

    Route::group([
        'namespace' => 'User',
    ], function () {

        Route::get('email/verify/{id}', 'VerificationAPIController@verify')->name('verification.verify');
        Route::get('email/resend', 'VerificationAPIController@resend')->name('verification.resend');
        Route::post('password/email','ForgotPasswordAPIController@sendResetLinkEmail');
        Route::post('reset-password','ResetPasswordAPIController@resetPassword');

        Route::post('register', 'UsersAPIController@register');
        Route::post('login','LoginController@login');

        Route::apiResource('roles', 'RolesAPIController');
        Route::apiResource('permissions', 'PermissionsAPIController');
        Route::post('set_unset_permission_to_role', 'PermissionsAPIController@setUnsetPermissionToRole');



        Route::group([
            'middleware' => ['auth:api', 'check.permission'],
        ], function() {

            Route::apiResource('countries', 'CountriesAPIController');
            Route::get('countries-export', 'CountriesAPIController@export');

            Route::apiResource('states', 'StatesAPIController');
            Route::get('states-export', 'StatesAPIController@export');

            Route::apiResource('cities', 'CitiesAPIController');
            Route::get('cities-export', 'CitiesAPIController@export');

            Route::apiResource('hobbies', 'HobbiesAPIController');
            Route::get('hobbies-export', 'HobbiesAPIController@export');

            Route::post('users/{user}', 'UsersAPIController@update');
            Route::apiResource('users', 'UsersAPIController');
            Route::get('users-export', 'UsersAPIController@export');

            Route::post('change-password','LoginController@changePassword');
        });
    });

});
