<?php

namespace App\Providers;

use App\Hub\Components\Slots\ProductIdentifiersSlot;
use App\Hub\Components\Slots\SeoSlot;
use App\Hub\Components\Slots\VehicleSlot;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;
use Lunar\Hub\Facades\Slot;
use Lunar\Hub\LunarHub;

use Lunar\Hub\Facades\Menu;

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
        // $this->registerSeoSlot();
        $this->registerVehicleSlot();
        $this->registerProductIdentifiersSlot();
        $this->registerAssets();
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

    private function registerProductIdentifiersSlot()
    {
        Livewire::component('hub.components.products.slots.product-identifiers-slot', ProductIdentifiersSlot::class);
        Slot::register('product.create', ProductIdentifiersSlot::class);
        Slot::register('product.show', ProductIdentifiersSlot::class);
    }

    private function registerAssets()
    {
        LunarHub::style('custom-hub', __DIR__.'/../../resources/views/hub/css/styles.css');

        LunarHub::remoteScript('https://code.jquery.com/jquery-3.7.0.min.js"');
        LunarHub::script('custom-hub', __DIR__.'/../../resources/views/hub/js/script.js');
    }
}
