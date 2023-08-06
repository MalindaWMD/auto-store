<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\NewPasswordController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/{path?}', function () {
    return view('app');
})->where('path', '^(?!hub$).*$');

Route::get('/', function () {
    return view('app');
})->name('app');

Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.reset');
