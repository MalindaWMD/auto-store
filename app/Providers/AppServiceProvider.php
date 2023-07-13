<?php

namespace App\Providers;

use App\Modifiers\CustomShippingModifier;
use Illuminate\Support\ServiceProvider;
use Lunar\Facades\ModelManifest;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(\Lunar\Base\ShippingModifiers $shippingModifiers): void
    {
        $shippingModifiers->add(
            CustomShippingModifier::class
        );

        $models = collect([
            \Lunar\Models\Product::class => \App\Models\Product::class,
        ]);
    
        ModelManifest::register($models);
    }
}
