<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Models;

use App\Models\VehicleModel;
use Livewire\Component;
use Lunar\Hub\Http\Livewire\Traits\Notifies;

class VehicleModelsEdit extends Component
{
    use Notifies;

    public $mode = 'create';

    public $model;

    public $makerId;

    protected $rules = [
        'model.name' => 'required',
        'model.active' => '',
        'model.group_name' => 'max:25',
        'model.constructed_from' => 'max:25',
        'model.constructed_to' => 'max:25',
    ];

    public function mount($id)
    {
        $this->model = VehicleModel::find($id);
        $this->makerId = $this->model ? $this->model->maker_id : request()->get('maker_id');
        $this->mode = request()->get('mode', $this->model ? 'edit' : 'create');

        if( $this->mode == 'create' && ! $this->makerId){
            $this->notify('Please select a maker to create new model', 'hub.utils.vehicles.index');
        }
    }

    public function getSubmitAction()
    {
        return $this->mode == 'edit' ? 'update' : 'store';
    }

    public function update()
    {
        $this->validate();

        $this->model->save();

        $this->notify('Vehicle model updated');
    }

    public function store()
    {
        $this->validate();

        $this->model['maker_id'] = $this->makerId;

        VehicleModel::create($this->model);

        $this->notify('Vehicle model created', 'hub.utils.vehicles.edit', [$this->makerId]);
    }
    
    public function render()
    {
        return view('livewire.hub.utils.vehicles.models.edit')
                ->layout('adminhub::layouts.app', [
                    'title' => 'Edit model',
                ]);
    }
}
