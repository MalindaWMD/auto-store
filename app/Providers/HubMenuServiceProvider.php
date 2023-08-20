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

        $utilsSection = $slot
            ->group('hub.utils')
            ->name('Utils');

        $utilsSection->addItem(function ($item) {
            $item
                ->name('Image scrapper')
                ->handle('hub.utils.scrappers.images')
                ->route('hub.utils.scrappers.image.index')
                ->gate('view-utils')
                ->icon('photograph');
        });

        $utilsSection->addItem(function ($item) {
            $item
                ->name('Vehicles')
                ->handle('hub.utils.vehicles')
                ->route('hub.utils.vehicles.index')
                ->gate('view-utils')
                ->icon('truck');
        });

        $utilsSection->addItem(function ($item) {
            $item
                ->name('Vehicle requests')
                ->handle('hub.utils.vehicles.requests')
                ->route('hub.utils.vehicles.requests.index')
                ->gate('view-utils')
                ->icon('save');
        });
    }
}
