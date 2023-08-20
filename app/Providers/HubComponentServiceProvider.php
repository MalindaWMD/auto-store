<?php

namespace App\Providers;

use App\Http\Livewire\Hub\Utils\ImageScrapper\ImageScrapperIndex;
use App\Http\Livewire\Hub\Utils\Vehicles\VehiclesTable;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;

class HubComponentServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Livewire::component('hub.utils.vehicles.table', VehiclesTable::class);
    }
}
