<?php

use Illuminate\Http\Request;

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

Route::get('/user', function(){
	try {

		if (! $user = JWTAuth::parseToken()->authenticate()) {
			return response()->json(['user_not_found'], 404);
		}

	} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

		return response()->json(['token_expired'], $e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

		return response()->json(['token_invalid'], $e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

		return response()->json(['token_absent'], $e->getStatusCode());

	}
	$user['username'] = $user->get()[0]['email'];

	//var_dump($user);

	// the token is valid and we have found the user via the sub claim
	return response()->json($user);
});


Route::apiResource('users', 'UsersController');

Route::apiResource('resources', 'ResourcesController');
Route::get('resources/{id}/related', 'ResourcesController@related');
Route::get('resources/search', 'ResourcesController@search');
Route::get('resources/search/{term}', 'ResourcesController@search');
Route::get('resources/search/{term}/{filter}', 'ResourcesController@search');
Route::get('resources/search/{term}/{filter}/{value}', 'ResourcesController@search');
Route::get('resources/filter', 'ResourcesController@filter');
Route::get('resources/filter/{filter}', 'ResourcesController@filter');
Route::get('resources/filter/{filter}/{value}', 'ResourcesController@filter');

Route::apiResource('articles', 'ArticlesController');
Route::get('articles/search/{term}', 'ArticlesController@search');

Route::apiResource('videos', 'VideosController');
Route::get('videos/{id}/related', 'VideosController@related');
Route::get('videos/search/{term}', 'VideosController@search');

Route::apiResource('reviews', 'ReviewsController');
Route::get('reviews/{id}/related', 'ReviewsController@related');
Route::get('reviews/search/{term}', 'ReviewsController@search');
Route::get('reviews/search/{term}/{filter}', 'ReviewsController@search');
Route::get('reviews/search/{term}/{filter}/{value}', 'ReviewsController@search');
Route::get('reviews/filter', 'ReviewsController@filter');
Route::get('reviews/filter/{filter}', 'ReviewsController@filter');

Route::apiResource('playlists', 'PlaylistsController');
Route::apiResource('pages', 'PagesController');

Route::apiResource('reviews_categories', 'ReviewsCategoriesController');

Route::apiResource('experts', 'ExpertsController');

Route::apiResource('tags', 'TagsController');

Route::post('/login', function(Request $request)
{
    // grab credentials from the request
    $credentials = $request->only('email', 'password');

    try {
        // attempt to verify the credentials and create a token for the user
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
    } catch (JWTException $e) {
        // something went wrong whilst attempting to encode the token
        return response()->json(['error' => 'could_not_create_token'], 500);
    }

    // all good so return the token
    return response()->json(compact('token'));
});


Route::post('/form/contact/feedback', 'ContactFormController@feedback');
Route::post('/form/contact/doctors', 'ContactFormController@doctors');
Route::post('/form/contact/resources', 'ContactFormController@resources');