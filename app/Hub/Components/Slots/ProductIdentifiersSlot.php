<?php

namespace App\Hub\Components\Slots;


use Lunar\Hub\Slots\AbstractSlot;
use Lunar\Hub\Slots\Traits\HubSlot;
use Livewire\Component;

class ProductIdentifiersSlot extends Component implements AbstractSlot
{
    use HubSlot;

    public $sku;
    public $serialNo;

    public $externalSerialNo;

    public function mount()
    {
        $this->serialNo = $this->slotModel->serial_no;
        $this->externalSerialNo = $this->slotModel->external_serial_no;
        $this->sku = $this->slotModel->variants->first()?->sku;
    }

    public static function getName()
    {
        return 'hub.components.products.slots.product-identifiers-slot';
    }

    public function getSlotHandle()
    {
        return 'product-identifiers-slot';
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
        return 'Identifiers';
    }

    public function updateSlotModel()
    {
     
        if( ! $this->serialNo && ! $this->externalSerialNo){
            return;
        }

        $this->slotModel->serial_no = $this->serialNo;
        $this->slotModel->external_serial_no = $this->externalSerialNo;
        $this->slotModel->save();
        
    }

    public function handleSlotSave($model, $data)
    {
        //
    }

    public function render()
    {
        return view('hub.slots.product-identifiers-slot');
    }
}
