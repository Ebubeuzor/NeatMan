<?php

use App\Http\Controllers\Api\ForgotPasswordController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/reset-password', [ForgotPasswordController::class, 'returnView'])->name('password.reset');

Route::post('/resetPassword', [ForgotPasswordController::class, 'resetPassword'])->name('changePassword');


Route::get('/test', function () {
    return 'Test Route Works!';
});


Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');