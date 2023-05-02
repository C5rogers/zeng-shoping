<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\OrderController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//this is for normal users
Route::post('/signup',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::get('/item',[ItemController::class,'index']);
Route::get('/item/{item}',[ItemController::class,'show']);
Route::post('/item/like/{item}',[ItemController::class,'like']);
Route::post('/item/dislike/{item}',[ItemController::class,'dislike']);


//this is for authenticated 
Route::group(['middleware'=>['auth:sanctum']],function(){

    Route::get('/order',[OrderController::class,'index']);
    Route::post('/order',[OrderController::class,'store']);
    Route::delete('/order/{orderRequest}',[OrderController::class,'destroy']);

    Route::get('/cart',[CartController::class,'index']);
    Route::post('/cart',[CartController::class,'store']);
    Route::put('/cart/{cart}',[CartController::class,'update']);

    Route::delete('/cart/{cart}',[CartController::class,'destroy']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/user',[AuthController::class,'getUser']);
    Route::post('/item',[ItemController::class,'store']);

});

