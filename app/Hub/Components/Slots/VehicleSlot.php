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

    public $oeNumbers = [];

    public $makes;
    public $models;
    public $engines;

    public $vehicles;

    protected $rules = [
        'makerId' => 'required',
        'modelId' => 'required',
        'engineId' => 'required',
    ];

    // Slot functions
    public function mount()
    { 
        // $this->loadVehicleData();

        $this->makes = $this->loadMakers();
        $this->loadModels();
        $this->loadEgines();

        $this->vehicles = [];

        $this->loadRelatedVehicles();

        $this->oeNumbers = $this->slotModel->oe_numbers ? explode(',', $this->slotModel->oe_numbers) : [];
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
        $this->slotModel->vehicles()->detach();

        $vehicles = array_keys($this->vehicles);

        foreach($vehicles as $vehicle){
            $detatils = explode(':', $vehicle);

             $vehicle = Vehicle::firstOrCreate([
                'maker_id' => $detatils[0],
                'model_id' => $detatils[1],
                'engine_id' => $detatils[2],
            ]);

            $this->slotModel->vehicles()->syncWithoutDetaching([$vehicle->id]);
        }

        $this->slotModel->related_vehicles = implode(',', $vehicles);
        $this->slotModel->oe_numbers = implode(',', $this->oeNumbers);
        $this->slotModel->save();
    }

    public function handleSlotSave($model, $data)
    {
        $this->slotModel = $model;
    }

    public function render()
    {
        return view('hub.slots.vehicle-slot');
    }

    public function addVehicle()
    {
        if($this->makerId && $this->modelId && $this->engineId){
            $this->vehicles[$this->getVehicleCode()] = [
                $this->makes->find($this->makerId)?->name => $this->makerId,
                $this->models->find($this->modelId)?->name => $this->modelId,
                $this->engines->find($this->engineId)?->name => $this->engineId,
            ];
        }
    }

    public function removeVehicle($code)
    {
        if(isset($this->vehicles[$code])){
            unset($this->vehicles[$code]);
        }
    }

    // Getters
    public function getModels()
    {
        return $this->models->sortBy('group_name')->groupBy('group_name')->toBase()->toArray();
    }

    public function getEngines()
    {
        return $this->engines;
    }

    // Loaders
    private function loadVehicleData()
    {
        $vehicle = $this->slotModel->vehicles?->first();

        if($vehicle){
            $this->makerId = $vehicle->maker_id;
            $this->modelId = $vehicle->model_id;
            $this->engineId = $vehicle->engine_id;
        }
    }

    private function loadMakers()
    {
        return VehicleMake::getActive();
    }

    private function loadModels()
    {
        if($this->makerId){
            return $this->models = VehicleModel::getActiveByMaker($this->makerId);
        }

        $this->models = collect();
    }

    private function loadEgines()
    {
        if($this->modelId){
            return $this->engines = VehicleEngine::getActiveByModel($this->modelId);
        }

        $this->engines = collect();
    }

    private function loadRelatedVehicles()
    {
        $vehicles = $this->slotModel->vehicles;

        if(!$vehicles){
            return;
        }

        foreach($vehicles as $vehicle){
            $code = implode(':', [$vehicle->maker_id, $vehicle->model_id, $vehicle->engine_id]);
            $this->vehicles[ $code ] = [
                $vehicle->make->name => $vehicle->maker_id,
                $vehicle->model->name => $vehicle->model_id,
                $vehicle->engine->name => $vehicle->engine_id,
            ];
        }

        // dd($vehicles->toArray());
    }

    // Events
    public function updatedMakerId($value)
    {
        $this->models = collect();
        $this->engines = collect();

        $this->loadModels();
    }

    public function updatedModelId($value)
    {
        $this->loadEgines();
    }

    private function getVehicleCode()
    {
        return implode(':', [$this->makerId, $this->modelId ,$this->engineId]);
    }
}