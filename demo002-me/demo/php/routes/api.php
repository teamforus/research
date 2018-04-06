<?php

use Illuminate\Http\Request;
use  \Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => '/auth'], function() {
    Route::get('/token', 'Api\AuthController@token');
    Route::post('/token/check', 'Api\AuthController@checkToken');
    Route::post('/token/exchange', 'Api\AuthController@exchangeToken');
    Route::post('/register', 'Api\AuthController@register');
});

Route::group(['prefix' => '/', 'middleware' => ['token.access']], function() {
    Route::group(['prefix' => 'user'], function() {
        Route::get('', 'Api\UserController@user');
        Route::get('records', 'Api\UserController@records');
        Route::get('tokens', 'Api\UserController@tokens');
        Route::post('records/validate', 'Api\UserController@validateRecord');
        Route::get('coins', 'Api\UserController@coins');
        Route::get('voucher', 'Api\UserController@voucher');
        Route::get('voucher/qr-code', 'Api\UserController@voucherQrCode');
    });

    Route::group(['prefix' => '/intent'], function() {
        Route::get('/read/{token}', 'Api\IntentController@read');
        Route::post('/accept/{token}', 'Api\IntentController@accept');
        Route::post('/decline/{token}', 'Api\IntentController@decline');
        Route::post('/make', 'Api\IntentController@make');
    });

    Route::group(['prefix' => '/transaction'], function() {
        Route::post('/send', 'Api\TransactionController@send');
        Route::post('/send/validate', 'Api\TransactionController@sendValidate');
        Route::post('/ask', 'Api\TransactionController@ask');
        Route::post('/ask/check', 'Api\TransactionController@askCheck');
        Route::post('/ask/accept', 'Api\TransactionController@askAccept');
        Route::post('/ask/decline', 'Api\TransactionController@askDecline');
    });

    Route::post('/votes/{vote}/activate', 'Api\VoteController@activate');
    Route::post('/votes/{vote}/vote', 'Api\VoteController@vote');
    Route::get('/votes/active', 'Api\VoteController@active');
    Route::resource('/votes', 'Api\VoteController', [
        'only' => ['index', 'show', 'update', 'store', 'destroy']
    ]);
});