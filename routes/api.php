<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StorefrontController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// User
Route::get('user', [UserController::class, 'index']);


// Checkout
Route::post('checkout', [CheckoutController::class, 'store']);
