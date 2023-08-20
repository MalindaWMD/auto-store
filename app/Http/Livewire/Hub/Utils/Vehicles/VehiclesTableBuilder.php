<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles;

use App\Models\VehicleMake;
use Lunar\Hub\Tables\TableBuilder;

class VehiclesTableBuilder extends TableBuilder 
{
/**
     * Return the query data.
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getData(): iterable
    {
        $query = VehicleMake::query();

        if ($this->searchTerm) {
            $query->where('name', 'LIKE', '%'.$this->searchTerm.'%');
        }

        return $query->paginate($this->perPage);
    }
}