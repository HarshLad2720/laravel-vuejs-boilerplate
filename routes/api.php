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

        Route::group([
            'middleware' => ['auth:api', 'check.permission'],
        ], function() {

            Route::apiResource('countries', 'CountriesAPIController');
            Route::get('countries-export', 'CountriesAPIController@export');
            Route::post('countries-import-bulk', 'CountriesAPIController@importBulk');

            Route::apiResource('states', 'StatesAPIController');
            Route::get('states-export', 'StatesAPIController@export');
            Route::post('states-import-bulk', 'StatesAPIController@importBulk');

            Route::apiResource('cities', 'CitiesAPIController');
            Route::get('cities-export', 'CitiesAPIController@export');
            Route::post('cities-import-bulk', 'CitiesAPIController@importBulk');

            Route::apiResource('hobbies', 'HobbiesAPIController');
            Route::get('hobbies-export', 'HobbiesAPIController@export');
            Route::post('hobbies-import-bulk', 'HobbiesAPIController@importBulk');

            Route::post('users/{user}', 'UsersAPIController@update');
            Route::apiResource('users', 'UsersAPIController');
            Route::get('users-export', 'UsersAPIController@export');

            Route::apiResource('roles', 'RolesAPIController');
            Route::get('roles-export', 'RolesAPIController@export');

            Route::apiResource('permissions', 'PermissionsAPIController');
            Route::get('permissions-export', 'PermissionsAPIController@export');

            Route::post('set_unset_permission_to_role', 'PermissionsAPIController@setUnsetPermissionToRole');

            Route::post('change-password','LoginController@changePassword');

            Route::delete('gallery/{gallery}', 'UsersAPIController@delete_gallery');
        });
    });

});
