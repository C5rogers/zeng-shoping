<?php

use App\Http\Controllers\Api\AdminController;
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
Route::post('/signup',[AuthController::class,'register']); //don
Route::post('/login',[AuthController::class,'login']); //done

Route::get('/item',[ItemController::class,'index']); //done
Route::get('/item/{item}',[ItemController::class,'show']); //done
Route::post('/item/like/{item}',[ItemController::class,'like']); //must be modified later
Route::post('/item/dislike/{item}',[ItemController::class,'dislike']); //must be modified later


//this is for authenticated 
Route::group(['middleware'=>['auth:sanctum']],function(){

    Route::get('/order',[OrderController::class,'index']); //done
    Route::post('/order',[OrderController::class,'store']); //done
    Route::delete('/order/{orderRequest}',[OrderController::class,'destroy']); //done

    Route::get('/cart',[CartController::class,'index']); //done
    Route::post('/cart',[CartController::class,'store']); //done
    Route::put('/cart/{cart}',[CartController::class,'update']); //done
    Route::delete('/cart/{cart}',[CartController::class,'destroy']); //done

    Route::post('/logout',[AuthController::class,'logout']); //done
    Route::get('/user',[AuthController::class,'getUser']); //done

    Route::get('/allUsers',[AdminController::class,'getAllUsers']); 
    Route::get('/allOrders',[AdminController::class,'getAllOrders']); //done
    Route::get('/allSoldItems',[AdminController::class,'getSoldItems']); //done
    Route::post('/item',[ItemController::class,'store']); //done
    Route::put('/item/{item}',[ItemController::class,'update']); //done
    Route::delete('/item/{item}',[ItemController::class,'destroy']); //done
    Route::post('/order/sale/{orderRequest}',[AdminController::class,'sale']); //done
    Route::delete('/order/rollback/{order}',[AdminController::class,'rollBackOrderItem']); //done

    Route::delete('/soldItem/{soldItem}',[AdminController::class,'deleteSoldItem']);

});

