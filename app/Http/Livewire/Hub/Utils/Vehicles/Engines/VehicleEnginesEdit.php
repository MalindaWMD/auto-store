<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Engines;

use App\Models\VehicleEngine;
use App\Models\VehicleModel;
use Livewire\Component;
use Lunar\Hub\Http\Livewire\Traits\Notifies;

class VehicleEnginesEdit extends Component
{
    use Notifies;

    public $mode = 'create';

    public $engine;

    public $modelId;

    public $fuelTypes = [
        'Petrol',
        'Diesel',
        'Petrol-Hybrid',
        'Diesel-Hybrid',
        'Plug-in Hybrid',
        'Electric',
    ];

    protected $rules = [
        'engine.name' => 'required',
        'engine.active' => '',
        'engine.fuel_type' => 'required',
    ];

    public function mount($id)
    {
        $this->engine = VehicleEngine::find($id);

        $this->modelId = $this->engine ? $this->engine->model_id : request()->get('model_id');
        $this->mode = request()->get('mode', $this->engine ? 'edit' : 'create');

        if( $this->mode == 'create' && ! $this->modelId){
            $this->notify('Please select a model to create new engine', 'hub.utils.vehicles.models.index');
        }
    }

    public function getSubmitAction()
    {
        return $this->mode == 'edit' ? 'update' : 'store';
    }

    public function update()
    {
        $this->validate();

        $this->engine->save();

        $this->notify('Vehicle engine updated');
    }
    
    public function store()
    {
        $this->validate();

        $this->engine['model_id'] = $this->modelId;

        VehicleEngine::create($this->engine);

        $this->notify('Vehicle engine created', 'hub.utils.vehicles.models.edit', [$this->modelId]);
    }

    public function render()
    {
        return view('livewire.hub.utils.vehicles.engines.edit')
                ->layout('adminhub::layouts.app', [
                    'title' => 'Edit engine',
                ]);
    }
}
