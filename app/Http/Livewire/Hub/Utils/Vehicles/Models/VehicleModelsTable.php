<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Models;


use Lunar\LivewireTables\Components\Columns\BadgeColumn;
use Lunar\LivewireTables\Components\Columns\TextColumn;
use Lunar\LivewireTables\Components\Table;

class VehicleModelsTable extends Table
{
    /**
     * {@inheritDoc}
     */
    protected $tableBuilderBinding = VehicleModelsTableBuilder::class;

    /**
     * {@inheritDoc}
     */
    public bool $searchable = true;

    /**
     * {@inheritDoc}
     */
    public bool $canSaveSearches = false;

    public $makerId = null;

    public function mount()
    {
        $this->makerId = request()->route('id');

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
            )->url(function($model){
                return route('hub.utils.vehicles.models.edit', [$model->id]);
            }),
            BadgeColumn::make('active', function ($model) {
                return $model->active ? 'Active' : 'Inactive';
            })->states(function($model){
                return [
                    'success' => $model->active,
                    'warning' => ! $model->active,
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

        $filters = ['maker_id' => $this->makerId];

        return $this->tableBuilder
            ->searchTerm($query)
            ->queryStringFilters($filters)
            ->perPage($this->perPage)
            ->getData();
    }
}
