<?php

namespace App\Providers;

use App\Modifiers\CustomShippingModifier;
use Illuminate\Support\ServiceProvider;
use Livewire\ObjectPrybar;
use Lunar\Facades\ModelManifest;
use Lunar\Hub\Auth\Manifest;
use Lunar\Facades\Payments;

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
            \Lunar\Models\ProductType::class => \App\Models\ProductType::class,
        ]);
    
        ModelManifest::register($models);

        if ($this->app['livewire']->isLivewireRequest()) {
            $this->bypassMiddleware([
                TrimStrings::class,
                ConvertEmptyStringsToNull::class,
            ]);
        }

        app()->make(Manifest::class)->addPermission(function ($permission) {
            $permission->name = 'Access utils';
            $permission->handle = 'view-utils';
            $permission->description= 'Allows the user to access util tools.';
            $permission->firstParty = true;
       }); 

       Payments::extend('payhere', function ($app) {
        return $app->make(PayherePayment::class);
    });
    }

    protected function bypassMiddleware(array $middlewareToExclude)
    {
        $kernel = $this->app->make(\Illuminate\Contracts\Http\Kernel::class);
        
        $openKernel = new ObjectPrybar($kernel);
        
        $middleware = $openKernel->getProperty('middleware');
        
        $openKernel->setProperty('middleware', array_diff($middleware, $middlewareToExclude));
    }
}
