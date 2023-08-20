<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ListLivewireComponents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hub:livewire-list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List registered custom livewire components';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Run discover
        Artisan::call('livewire:discover');
        
        // Get manifest
        $components = $this->getComponents();

        $this->table(['Handle', 'Class'], $components );
    }

    private function getComponents()
    {
        $this->info('Registered custom hub components');

        $manifest = app(\Livewire\LivewireComponentsFinder::class)->getManifest();

        $rows = [];
        foreach ($manifest as $handle => $class) {
            $rows[] = [$handle, $class];
        }

        return $rows;
    }
}
