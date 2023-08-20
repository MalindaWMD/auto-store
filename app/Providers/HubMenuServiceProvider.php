<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Lunar\Hub\Facades\Menu;

class HubMenuServiceProvider extends ServiceProvider
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
        $slot = Menu::slot('sidebar');

        $this->utilsMenu($slot);
    }

    private function storefrontMenu($slot)
    {
        $slot->addItem(function ($item) {
            $item->name('Visit Storefront')
                ->handle('hub.visit-storefront')
                ->route('app')
                ->icon('external-link');
        });
    }

    private function utilsMenu($slot)
    {
        $utilsGroup = $slot
            ->group('hub.utils')
            ->name('Utils');

        $utilsGroup->addItem(function ($item) {
            $item->name('Image scrapper')
                ->handle('hub.utils.scrappers.images')
                ->route('hub.utils.scrappers.image.index')
                ->gate('view-utils')
                ->icon('photograph');
        });

        // Vehicles
        $vehiclesSection = $utilsGroup
            ->section('hub.utils.vehicles')
            ->route('hub.utils.vehicles.index')
            ->icon('truck')
            ->name('Vehicles');

        $vehiclesSection->addItem(function ($item) {
            $item->name('Vehicles')
                ->handle('hub.utils.vehicles')
                ->route('hub.utils.vehicles.index')
                ->gate('view-utils')
                ->icon('truck');
        });

        $vehiclesSection->addItem(function ($item) {
            $item->name('Vehicle requests')
                ->handle('hub.utils.vehicles.requests')
                ->route('hub.utils.vehicles.requests.index')
                ->gate('view-utils')
                ->icon('save');
        });
    }
}