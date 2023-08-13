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
                ->icon('photograph');
        });
    }
}
