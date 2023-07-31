<?php

namespace Database\Seeders;

use App\Models\VehicleMake;
use App\Models\VehicleModel;
use Illuminate\Database\Seeder;

class VehicleModelSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $scanned_directory = array_diff(scandir('database/seeders/models'), array('..', '.'));

        foreach($scanned_directory as $file){
            $content = file_get_contents('database/seeders/models/'.$file);
            
            $models = json_decode($content, true);

            if($models == false){
                $jsonError = json_last_error_msg();
                echo "Error importing models from, $file, $jsonError \n";
                continue;
            }

            echo "Importing , $file \n";


            // get maker and check if exists
            $makerName = strtoupper($models['name']);
            $maker = VehicleMake::where('name', $makerName)->first();

            if( !$maker ){
                echo "Maker not found, $file \n";
                continue;
            }

            // Create models if not already exists with the same alias
            foreach($models['models'] as $model) {
                foreach($model['items'] as $item){
                    if(VehicleModel::where('group_name', $item['groupName'])->where('alias', $item['modelAlias'])->exists()){
                        echo "Model already exists, {$item['modelAlias']} \n";
                        continue;
                    }

                    $maker->models()->create([
                        'name' => $item['name'],
                        'alias'  => $item['modelAlias'],
                        'group_name'  => $item['groupName'],
                        'constructed_from'  => $item['yearOfConstrFrom'],
                        'constructed_to'  => $item['yearOfConstrTo'],
                    ]);
                }
            }
        }
    }
}
