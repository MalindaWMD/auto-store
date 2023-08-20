<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Requests;

use App\Models\VehicleMake;
use App\Models\VehicleRequest;
use Lunar\Hub\Tables\TableBuilder;

class VehicleRequestsTableBuilder extends TableBuilder 
{
/**
     * Return the query data.
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getData(): iterable
    {
        return VehicleRequest::latest()->paginate($this->perPage);
    }
}