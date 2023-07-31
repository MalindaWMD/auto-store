<?php

namespace App\Hub\Components\Slots;

use App\Models\Vehicle;
use App\Models\VehicleEngine;
use App\Models\VehicleMake;
use App\Models\VehicleModel;
use Lunar\Hub\Slots\AbstractSlot;
use Lunar\Hub\Slots\Traits\HubSlot;
use Livewire\Component;

class VehicleSlot extends Component implements AbstractSlot
{
    use HubSlot;

    public $makerId;
    public $modelId;
    public $engineId;

    public $makes;
    public $models;
    public $engines;

    // Slot functions
    public function mount()
    { 
        $this->loadVehicleData();

        $this->makes = $this->loadMakers();
        $this->models = $this->loadModels();
        $this->engines = $this->loadEgines();
    }

    public static function getName()
    {
        return 'hub.components.products.slots.vehicle-slot';
    }

    public function getSlotHandle()
    {
        return 'vehicle-slot';
    }

    public function getSlotInitialValue()
    {
        return [];
    }

    public function getSlotPosition()
    {
        return 'top';
    }

    public function getSlotTitle()
    {
        return 'Vehicle information';
    }

    public function updateSlotModel()
    {
        $vehicle = Vehicle::firstOrCreate([
            'maker_id' => $this->makerId,
            'model_id' => $this->modelId,
            'engine_id' => $this->engineId,
        ]);

        $this->slotModel->vehicles()->syncWithoutDetaching([$vehicle->id]);
    }

    public function handleSlotSave($model, $data)
    {
        $this->slotModel = $model;
    }

    public function render()
    {
        return view('hub.slots.vehicle-slot');
    }

    // Getters
    public function getModels()
    {
        return $this->models->groupBy('group_name')->toBase();
    }

    public function getEngines()
    {
        return $this->engines;
    }

    // Loaders
    private function loadVehicleData()
    {
        $vehicle = $this->slotModel->vehicles->first();

        if($vehicle){
            $this->makerId = $vehicle->maker_id;
            $this->modelId = $vehicle->model_id;
            $this->engineId = $vehicle->engine_id;
        }
    }

    private function loadMakers()
    {
        return VehicleMake::active()->get()->toArray();
    }

    private function loadModels()
    {
        if($this->makerId){
            return VehicleModel::getActiveByMaker($this->makerId);
        }

        return [];
    }

    private function loadEgines()
    {
        if($this->modelId){
            return VehicleEngine::getActiveByModel($this->modelId);
        }

        return [];
    }

    // Events
    public function updatedMakerId($value)
    {
        $this->loadModels();
    }

    public function updatedModelId($value)
    {
        $this->loadEgines();
    }
}