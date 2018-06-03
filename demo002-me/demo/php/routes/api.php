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

// Old routes
/*Route::group(['prefix' => '/auth'], function() {
    Route::get('/token', 'Api\AuthController@token');
    Route::post('/token/check', 'Api\AuthController@checkToken');
    Route::post('/token/exchange', 'Api\AuthController@exchangeToken');
    Route::post('/register', 'Api\AuthController@register');
});

Route::group(['prefix' => '/', 'middleware' => ['api.auth']], function() {
    Route::group(['prefix' => 'user'], function() {
        Route::get('', 'Api\UserController@user');
        Route::get('records', 'Api\UserController@records');
        Route::post('records/validate', 'Api\UserController@validateRecord');
        Route::get('coins', 'Api\UserController@coins');
        Route::get('voucher', 'Api\UserController@voucher');
        Route::get('voucher/qr-code', 'Api\UserController@voucherQrCode');
    });
});*/





// New routes
Route::group(['namespace' => 'Api'], function() {
    Route::group(['prefix' => '/identity'], function() {
        Route::post('/', 'IdentityController@store');

        Route::group(['prefix' => '/proxy'], function() {
            Route::post('/code', 'IdentityController@proxyAuthorizationCode');
            Route::post('/token', 'IdentityController@proxyAuthorizationToken');
            Route::post('/email', 'IdentityController@proxyAuthorizationEmailToken');

            Route::group(['prefix' => '/authorize'], function() {
                Route::get('/email/{source}/{emailToken}', 'IdentityController@proxyAuthorizeEmail');
            });
        });

        Route::get('/status', 'IdentityController@status');
    });

});

Route::group(['namespace' => 'Api', 'middleware' => ['api.auth']], function() {

    Route::group(['prefix' => '/intent'], function() {
        Route::get('/read/{token}', 'IntentController@read');
        Route::post('/accept/{token}', 'IntentController@accept');
        Route::post('/decline/{token}', 'IntentController@decline');
        Route::post('/make', 'IntentController@make');
    });

    Route::group(['prefix' => '/identity'], function() {
        Route::get('/', 'IdentityController@index');
        Route::get('/pin-code/{pinCode}', 'IdentityController@checkPinCode');
        Route::post('/pin-code', 'IdentityController@updatePinCode');

        /**
         * Tokens
         */

        Route::post('/votes/{vote}/activate', 'Identity\VoteController@activate');
        Route::post('/votes/{vote}/vote', 'Identity\VoteController@vote');
        Route::get('/votes/active', 'Identity\VoteController@active');
        Route::resource('/votes', 'Identity\VoteController', [
            'only' => ['index', 'show', 'update', 'store', 'destroy']
        ]);

        Route::group(['prefix' => '/wallet'], function() {
            Route::group(['prefix' => '/tokens'], function() {
                Route::get('/', 'Identity\Wallet\TokensController@index');
                Route::get('/overview/{tokenId}', 'Identity\Wallet\TokensController@overview');
            });

            Route::group(['prefix' => '/assets'], function() {
                Route::get('/', 'Identity\Wallet\AssetsController@index');
                Route::patch('/{assetId}', 'Identity\Wallet\AssetsController@update');
            });

            Route::group(['prefix' => '/vouchers'], function() {
                Route::get('/', 'Identity\Wallet\VouchersController@index');
                Route::get('/overview/{voucherId}', 'Identity\Wallet\VouchersController@overview');
                Route::post('/split/{voucherId}', 'Identity\Wallet\VouchersController@split');
            });

            // kinpakket frontend
            Route::group(['prefix' => '/voucher'], function() {
                Route::get('/', 'Identity\Wallet\VouchersController@voucher');
                Route::get('/qr-code', 'Identity\Wallet\VouchersController@voucherQrCode');
            });

            Route::group(['prefix' => '/transaction'], function() {
                Route::post('/send', 'Identity\Wallet\TransactionController@send');
                Route::post('/send/validate', 'Identity\Wallet\TransactionController@sendValidate');
                Route::post('/ask', 'Identity\Wallet\TransactionController@ask');
                Route::post('/ask/check', 'Identity\Wallet\TransactionController@askCheck');
                Route::post('/ask/accept', 'Identity\Wallet\TransactionController@askAccept');
                Route::post('/ask/decline', 'Identity\Wallet\TransactionController@askDecline');
            });
        });


        /**
         * Identity proxies
         */
        Route::group(['prefix' => '/proxy'], function() {
            Route::delete('/', 'IdentityController@proxyDestroy');

            Route::group(['prefix' => '/authorize'], function() {
                Route::post('/code', 'IdentityController@proxyAuthorizeCode');
                Route::post('/token', 'IdentityController@proxyAuthorizeToken');
            });
        });

        /**
         * Record categories
         */
        Route::group(['prefix' => '/record-categories'], function() {
            Route::get('/', 'Identity\RecordCategoryController@index');
            Route::post('/', 'Identity\RecordCategoryController@store');
            Route::patch('/sort', 'Identity\RecordCategoryController@sort');
            Route::get('/{recordCategoryId}', 'Identity\RecordCategoryController@show');
            Route::patch('/{recordCategoryId}', 'Identity\RecordCategoryController@update');
            Route::delete('/{recordCategoryId}', 'Identity\RecordCategoryController@destroy');
        });

        /**
         * Record
         */
        Route::group(['prefix' => '/records'], function() {
            Route::get('/', 'Identity\RecordController@index');
            Route::post('/', 'Identity\RecordController@store');
            Route::get('/types', 'Identity\RecordController@typeKeys');
            Route::patch('/sort', 'Identity\RecordController@sort');
            Route::get('/{recordId}', 'Identity\RecordController@show');
            Route::patch('/{recordId}', 'Identity\RecordController@update');
            Route::delete('/{recordId}', 'Identity\RecordController@destroy');

            Route::post('/validate/{recordId}', 'Identity\RecordController@validateRecord');
            Route::post('/validate/intent/{recordId}', 'Identity\RecordController@makeValidationIntent');
            Route::get('/validate/intent/{intentToken}', 'Identity\RecordController@viewValidationIntent');
            Route::post('/validate/intent/{intentToken}/accept', 'Identity\RecordController@acceptValidationIntent');
            Route::post('/validate/intent/{intentToken}/decline', 'Identity\RecordController@declineValidationIntent');
        });
    });

    Route::get('/status', function() {
        return [
            'status' => 'ok'
        ];
    });
});
