<?php

namespace App\Http\Livewire\Hub\Utils\Vehicles\Requests;

use Lunar\LivewireTables\Components\Columns\BadgeColumn;
use Lunar\LivewireTables\Components\Columns\TextColumn;
use Lunar\LivewireTables\Components\Table;

class VehicleRequestsTable extends Table
{
    /**
     * {@inheritDoc}
     */
    protected $tableBuilderBinding = VehicleRequestsTableBuilder::class;

    /**
     * {@inheritDoc}
     */
    public bool $searchable = false;

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
            TextColumn::make('make')->heading('Make'),
            TextColumn::make('model')->heading('Model'),
            TextColumn::make('year')->heading('Year'),
            TextColumn::make('vin')->heading('VIN'),
            TextColumn::make('requester_email')->heading('Requester email'),
            BadgeColumn::make('status', function ($record) {
                return ucfirst($record->status);
            })->states(function($record){
                return [
                    'warning' => $record->status == 'pending',
                    'success' => $record->status == 'Full-filled',
                ];
            })->heading(
                'Status'
            ),
            TextColumn::make('created_at')->heading('Submitted at'),
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
