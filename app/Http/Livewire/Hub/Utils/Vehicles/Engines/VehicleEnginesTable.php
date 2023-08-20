<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Engines;


use Lunar\LivewireTables\Components\Columns\BadgeColumn;
use Lunar\LivewireTables\Components\Columns\TextColumn;
use Lunar\LivewireTables\Components\Table;

class VehicleEnginesTable extends Table
{
    /**
     * {@inheritDoc}
     */
    protected $tableBuilderBinding = VehicleEnginesTableBuilder::class;

    /**
     * {@inheritDoc}
     */
    public bool $searchable = true;

    /**
     * {@inheritDoc}
     */
    public bool $canSaveSearches = false;

    public $modelId = null;

    public function mount()
    {
        $this->modelId = request()->route('id');

        parent::mount();
    }

    /**
     * {@inheritDoc}
     */
    public function build()
    {
        $this->tableBuilder->baseColumns([
            TextColumn::make('name')->heading(
                __('adminhub::tables.headings.name')
            )->url(function($engine){
                return route('hub.utils.vehicles.engines.edit', [$engine->id]);
            }),
            BadgeColumn::make('active', function ($engine) {
                return $engine->active ? 'Active' : 'Inactive';
            })->states(function($engine){
                return [
                    'success' => $engine->active,
                    'warning' => ! $engine->active,
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
        
        $filters = ['model_id' => $this->modelId];
        
        return $this->tableBuilder
            ->searchTerm($query)
            ->queryStringFilters($filters)
            ->perPage($this->perPage)
            ->getData();
    }
}
