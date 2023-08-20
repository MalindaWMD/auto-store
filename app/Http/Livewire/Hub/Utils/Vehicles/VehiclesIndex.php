<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles;

use Illuminate\Http\Request;
use Livewire\Component;
use Livewire\LivewireComponentsFinder;

class VehiclesIndex extends Component
{
    public function render()
    {
        return view('livewire.hub.utils.vehicles.index')
                ->layout('adminhub::layouts.app', [
                    'title' => 'Vehicles',
                ]);
    }
}
