<?php

use App\Http\Controllers\Hub\ImageScrapperController;
use App\Http\Livewire\Hub\Utils\ImageScrapper\ImageScrapperIndex;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Lunar\Hub\Http\Middleware\Authenticate;

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

/**
 * New admin hub routes should be surrounded by following middewares and route
 */
Route::group([
    'prefix' => config('lunar-hub.system.path', 'hub'),
    'middleware' => ['web'],
], function () {
    Route::group([
        'middleware' => [
            Authenticate::class,
        ],
    ], function ($router) {
        Route::get('/image-scrapper', ImageScrapperIndex::class)->name('hub.utils.scrappers.image.index');
        Route::post('/image-scrapper/download', [ImageScrapperIndex::class, 'download']);
    });
});

Route::get('/{path?}', function () {
    return view('app');
})->where('path', '^(?!hub$).*$');

Route::get('/', function () {
    return view('app');
})->name('app');


Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.reset');


include __DIR__ . '/custom.php';