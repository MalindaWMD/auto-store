<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Models;

use App\Models\VehicleModel;
use Lunar\Hub\Tables\TableBuilder;

class VehicleModelsTableBuilder extends TableBuilder 
{
/**
     * Return the query data.
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getData(): iterable
    {
        $query = VehicleModel::query();

        if ($this->searchTerm) {
            $query->where('name', 'LIKE', '%'.$this->searchTerm.'%');
        }

        if($makerId = \Arr::get($this->queryStringFilters, 'maker_id')){
            $query->where('maker_id', $makerId);
        }

        return $query->paginate($this->perPage);
    }
}