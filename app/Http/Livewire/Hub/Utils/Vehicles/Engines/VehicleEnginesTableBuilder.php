<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Engines;

use App\Models\VehicleEngine;
use Lunar\Hub\Tables\TableBuilder;

class VehicleEnginesTableBuilder extends TableBuilder 
{
/**
     * Return the query data.
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getData(): iterable
    {
        $query = VehicleEngine::query();

        if ($this->searchTerm) {
            $query->where('name', 'LIKE', '%'.$this->searchTerm.'%');
        }

        if($modelId = \Arr::get($this->queryStringFilters, 'model_id')){
            $query->where('model_id', $modelId);
        }

        return $query->paginate($this->perPage);
    }
}