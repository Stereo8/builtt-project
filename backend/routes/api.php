<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\LoginController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
   Route::post('/login', [LoginController::class, 'authenticate']);
});

Route::middleware('auth:sanctum')->get('/products', [ProductController::class, 'productsList']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/order', [OrderController::class, 'createOrder']);
    Route::get('/order/${orderId}', [OrderController::class, 'getOrder']);
});
