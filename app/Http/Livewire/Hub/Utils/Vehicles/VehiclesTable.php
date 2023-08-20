<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles;

use App\Http\Livewire\Hub\Utils\Vehicles\VehiclesTableBuilder;
use Lunar\LivewireTables\Components\Columns\BadgeColumn;
use Lunar\LivewireTables\Components\Columns\TextColumn;
use Lunar\LivewireTables\Components\Table;

class VehiclesTable extends Table
{
    /**
     * {@inheritDoc}
     */
    protected $tableBuilderBinding = VehiclesTableBuilder::class;

    /**
     * {@inheritDoc}
     */
    public bool $searchable = true;

    /**
     * {@inheritDoc}
     */
    public bool $canSaveSearches = false;

    /**
     * {@inheritDoc}
     */
    public function build()
    {
        $this->tableBuilder->baseColumns([
            TextColumn::make('name')->heading(
                __('adminhub::tables.headings.name')
            )->url(function($make){
                return route('hub.utils.vehicles.edit', $make->id);
            }),
            BadgeColumn::make('active', function ($make) {
                return $make->active ? 'Active' : 'Inactive';
            })->states(function($make){
                return [
                    'success' => $make->active,
                    'danger' => ! $make->active,
                ];
            })->heading(
                'Status'
            ),
        ]);
    }
    
    /**
     * Return the search placeholder.
     *
     * @return string
     */
    public function getSearchPlaceholderProperty(): string
    {
        return 'Search by keyword';
    }
    
    /**
     * {@inheritDoc}
     */
    public function getData()
    {
        $query = $this->query;

        if ($this->savedSearch) {
            $search = $this->savedSearches->first(function ($search) {
                return $search['key'] == $this->savedSearch;
            });

            if ($search) {
                $query = $search['query'];
            }
        }

        return $this->tableBuilder
            ->searchTerm($query)
            ->perPage($this->perPage)
            ->getData();
    }
}
