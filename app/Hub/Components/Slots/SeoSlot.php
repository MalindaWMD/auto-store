<?php

namespace App\Hub\Components\Slots;

use Lunar\Hub\Slots\AbstractSlot;
use Lunar\Hub\Slots\Traits\HubSlot;
use Livewire\Component;

class SeoSlot extends Component implements AbstractSlot
{
    use HubSlot;

    public $title;

    public $description;

    protected $rules = [
        'title' => "max:250",
        'description' => "max:250",
    ];

    public function mount()
    {
        $this->title = $this->slotModel->seo_title;
        $this->description = $this->slotModel->seo_description;
    }

    public static function getName()
    {
        return 'hub.components.products.slots.seo-slot';
    }

    public function getSlotHandle()
    {
        return 'seo-slot';
    }

    public function getSlotInitialValue()
    {
        return [];
    }

    public function getSlotPosition()
    {
        return 'bottom';
    }

    public function getSlotTitle()
    {
        return 'SEO Content';
    }

    public function updateSlotModel()
    {
        // $this->validate();

        // $product = $this->slotModel;
        // $product->seo_title = $this->title;
        // $product->seo_description = $this->description;
        // $product->save();
    }

    public function handleSlotSave($model, $data)
    {
        //
    }

    public function render()
    {
        return view('hub.slots.seo-slot');
    }
}