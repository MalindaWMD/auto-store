<?php

namespace App\Providers;

use App\Modifiers\CustomShippingModifier;
use Illuminate\Support\ServiceProvider;
use Livewire\ObjectPrybar;
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

        if ($this->app['livewire']->isLivewireRequest()) {
            $this->bypassMiddleware([
                TrimStrings::class,
                ConvertEmptyStringsToNull::class,
            ]);
        }
    }

    protected function bypassMiddleware(array $middlewareToExclude)
    {
        $kernel = $this->app->make(\Illuminate\Contracts\Http\Kernel::class);
        
        $openKernel = new ObjectPrybar($kernel);
        
        $middleware = $openKernel->getProperty('middleware');
        
        $openKernel->setProperty('middleware', array_diff($middleware, $middlewareToExclude));
    }
}
