<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\HomepageController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function() {
    
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/rearrange', [ProductController::class, 'rearrange']);
    Route::post('/makeInquiry', [ProductController::class, 'makeInquiry']);
    Route::get('/newArrival', [ProductController::class, 'newArrival']);
    Route::put('/user/{user}', [UserController::class, 'update']);
    Route::put('/useraddress/{user}', [UserController::class, 'updateAddress']);

});

Route::get('/getProductsRandom', [ProductController::class, 'getProductsRandom']);

Route::apiResource('/category', CategoryController::class);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/contactUs', [ProductController::class, 'contactUs']);

Route::get('auth', [AuthController::class, 'redirectToAuth']);
Route::get('auth/callback', [AuthController::class, 'handleAuthCallback']);
Route::post('/password/reset', [ForgotPasswordController::class, 'sendPasswordResetEmail']);

Route::apiResource('/homepage', HomepageController::class);

Route::get('/childrenRandom', [ProductController::class, 'genderChildrenRandom']);
Route::get('/selectProducts', [ProductController::class, 'selectProducts']);
Route::get('/search', [ProductController::class, 'search']);
Route::get('/selectUserProducts', [ProductController::class, 'selectUserProducts']);
Route::apiResource('/products', ProductController::class);