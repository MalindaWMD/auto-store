<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles;

use App\Models\VehicleMake;
use Illuminate\Http\Request;
use Livewire\Component;
use Lunar\Hub\Http\Livewire\Traits\Notifies;

class VehiclesEdit extends Component
{
    use Notifies;

    public $mode = 'create';

    public $make;

    protected $rules = [
        'make.name' => 'required',
        'make.active' => '',
    ];

    public function mount($id)
    {
        $this->make = VehicleMake::find($id);
        $this->mode = request()->get('mode', $this->make ? 'edit' : 'create');
    }

    public function getSubmitAction()
    {
        return $this->mode == 'edit' ? 'update' : 'store';
    }

    public function update()
    {
        $this->validate();

        $this->make->save();

        $this->notify('Vehicle maker updated');
    }

    public function store()
    {
        $this->validate();

        VehicleMake::create($this->make);

        $this->notify('Vehicle maker created', 'hub.utils.vehicles.index');
    }

    public function render()
    {
        return view('livewire.hub.utils.vehicles.edit')
                ->layout('adminhub::layouts.app', [
                    'title' => 'Edit vehicles',
                ]);
    }
}
