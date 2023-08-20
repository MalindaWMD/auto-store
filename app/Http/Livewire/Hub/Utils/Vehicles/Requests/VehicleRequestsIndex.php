<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Requests;

use Livewire\Component;

class VehicleRequestsIndex extends Component
{
    public function render()
    {
        return view('livewire.hub.utils.vehicles.requests.index')
                ->layout('adminhub::layouts.app', [
                    'title' => 'Vehicle Requests',
                ]);
    }
}
