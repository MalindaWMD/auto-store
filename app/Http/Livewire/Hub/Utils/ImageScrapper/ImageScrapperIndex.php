<?php

namespace App\Http\Livewire\Hub\Utils\ImageScrapper;

use Illuminate\Http\Request;
use Livewire\Component;

class ImageScrapperIndex extends Component
{
    public function render()
    {
        return view('livewire.hub.utils.image-scrapper.image-scrapper-index')
                ->layout('adminhub::layouts.app', [
                    'title' => 'Image scrapper',
                ]);
    }
}
