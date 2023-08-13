<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\GoogleLoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StorefrontController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Application data
Route::get('app/data', [StorefrontController::class, 'getSiteData']);

// Product
Route::get('products/search', [ProductController::class, 'search']);
Route::apiResource('products', ProductController::class)
        ->parameters([
            'products' => 'slug'
        ])
        ->missing(function(Request $request){
            return Controller::fail('Resource not found', 404);
        });

// Cart
Route::get('cart', [CartController::class, 'index']);
Route::post('cart/add', [CartController::class, 'add']);
Route::get('cart/shipping-options', [CartController::class, 'getShippingOptions']);
Route::post('cart/clear', [CartController::class, 'clear']);
Route::post('cart/update', [CartController::class, 'updateItem']);
Route::post('cart/remove', [CartController::class, 'removeItem']);

// User
Route::get('user', [UserController::class, 'index']);
Route::post('login/google', [GoogleLoginController::class, 'store']);

// Checkout
Route::post('checkout', [CheckoutController::class, 'store']);

// Vehicle
Route::get('vehicles/makes', [VehicleController::class, 'getMakes']);
Route::get('vehicles/models/{id}', [VehicleController::class, 'getModels']);
Route::get('vehicles/makes/{id}', [VehicleController::class, 'getEngines']);
