<?php

use App\Http\Controllers\Hub\ImageScrapperController;
use App\Http\Livewire\Hub\Utils\ImageScrapper\ImageScrapperIndex;
use App\Http\Livewire\Hub\Utils\Vehicles\Engines\VehicleEnginesEdit;
use App\Http\Livewire\Hub\Utils\Vehicles\Models\VehicleModelsEdit;
use App\Http\Livewire\Hub\Utils\Vehicles\Models\VehicleModelsIndex;
use App\Http\Livewire\Hub\Utils\Vehicles\Requests\VehicleRequestsIndex;
use App\Http\Livewire\Hub\Utils\Vehicles\VehiclesEdit;
use App\Http\Livewire\Hub\Utils\Vehicles\VehiclesIndex;
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
        // Scraper
        Route::get('/image-scrapper', ImageScrapperIndex::class)->name('hub.utils.scrappers.image.index');
        Route::post('/image-scrapper/download', [ImageScrapperIndex::class, 'download']);

        // Vehicles

        Route::get('/vehicles/requests', VehicleRequestsIndex::class)->name('hub.utils.vehicles.requests.index');

        Route::get('/vehicles', VehiclesIndex::class)->name('hub.utils.vehicles.index');
        Route::get('/vehicles/create?mode=create', VehiclesEdit::class)->name('hub.utils.vehicles.create');
        Route::get('/vehicles/{id}', VehiclesEdit::class)->name('hub.utils.vehicles.edit');

        Route::get('/vehicles/models/create?mode=create&maker_id={id}', VehicleModelsEdit::class)->name('hub.utils.vehicles.models.create');
        Route::get('/vehicles/models/{id}', VehicleModelsEdit::class)->name('hub.utils.vehicles.models.edit');

        Route::get('/vehicles/engines/create?mode=create&model_id={id}', VehicleModelsEdit::class)->name('hub.utils.vehicles.engines.create');
        Route::get('/vehicles/engines/{id}', VehicleEnginesEdit::class)->name('hub.utils.vehicles.engines.edit');
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