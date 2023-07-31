<?php

namespace App\Providers;

use App\Hub\Components\Slots\SeoSlot;
use App\Hub\Components\Slots\VehicleSlot;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;
use Lunar\Hub\Facades\Slot;

class HubSlotsServiceProvider extends ServiceProvider
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
        $this->registerSeoSlot();
        $this->registerVehicleSlot();
    }

    private function registerSeoSlot()
    {
        Livewire::component('hub.components.products.slots.seo-slot', SeoSlot::class);
        Slot::register('product.create', SeoSlot::class);
        Slot::register('product.show', SeoSlot::class);
    }

    private function registerVehicleSlot()
    {
        Livewire::component('hub.components.products.slots.vehicle-slot', VehicleSlot::class);
        Slot::register('product.create', VehicleSlot::class);
        Slot::register('product.show', VehicleSlot::class);
    }
}
