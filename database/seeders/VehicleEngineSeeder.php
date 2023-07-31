<?php

namespace Database\Seeders;

use App\Models\VehicleEngine;
use App\Models\VehicleMake;
use App\Models\VehicleModel;
use Illuminate\Database\Seeder;

class VehicleEngineSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $scanned_directory = array_diff(scandir('database/seeders/engines'), array('..', '.'));

        foreach ($scanned_directory as $file) {
            $content = file_get_contents('database/seeders/engines/' . $file);

            $engines = json_decode($content, true);

            if ($engines == false) {
                $jsonError = json_last_error_msg();
                echo "Error importing engines from, $file, $jsonError \n";
                continue;
            }

            echo "Importing , $file \n";


            // get maker and check if exists
            $model = VehicleModel::where('alias', $engines['modelAlias'])->first();

            if (!$model) {
                echo "Model not found, $file \n";
                continue;
            }

            // Create models if not already exists with the same alias
            $items = array_merge(\Arr::get($engines, 'cars.Diesel.items', []), \Arr::get($engines, 'cars.Petrol.items', []));


            foreach ($items as $item) {
                if (VehicleEngine::where('name', $item['name'])->where('model_id', $model->id)->exists()) {
                    echo "Engine already exists, {$item['alias']} \n";
                    continue;
                }

                $model->engines()->create([
                    'name' => $item['name'],
                    'fuel_type' => $item['fuel'],
                ]);
            }
        }
    }
}