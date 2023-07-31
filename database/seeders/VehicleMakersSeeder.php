<?php

namespace Database\Seeders;

use App\Models\VehicleMake;
use Illuminate\Database\Seeder;

class VehicleMakersSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $makes = [
            'ALFA ROMEO',
            'ALPINE',
            'ASTON MARTIN',
            'AUDI',
            'BENTLEY',
            'BMW',
            'BORGWARD',
            'BUICK',
            'CADILLAC',
            'CHERY',
            'CHEVROLET',
            'CHRYSLER',
            'CITROЁN',
            'DAEWOO',
            'DAF',
            'DAIHATSU',
            'DAIMLER',
            'DFSK',
            'DODGE',
            'FERRARI',
            'FIAT',
            'FORD',
            'FORD ASIA / OCEANIA',
            'FORD OTOSAN',
            'FORD USA',
            'GEELY (GLEAGLE)',
            'GENESIS',
            'GMC',
            'HOLDEN',
            'HONDA',
            'HUMMER',
            'HYUNDAI',
            'INDIGO',
            'INFINITI',
            'ISUZU',
            'IVECO',
            'JAGUAR',
            'JEEP',
            'KIA',
            'KTM',
            'LAND ROVER',
            'LEXUS',
            'LINCOLN',
            'LLOYD',
            'LOTUS',
            'MAHINDRA',
            'MAN',
            'MARUTI',
            'MASERATI',
            'MAYBACH',
            'MAZDA',
            'MCLAREN',
            'MERCEDES-BENZ',
            'MG',
            'MIA ELECTRIC',
            'MICROCAR',
            'MINELLI',
            'MINI',
            'MITSUBISHI',
            'MORRIS',
            'NISSAN',
            'OPEL',
            'PEUGEOT',
            'PIAGGIO',
            'PORSCHE',
            'PROTON',
            'RENAULT',
            'RENAULT TRUCKS',
            'ROVER',
            'SKODA',
            'SSANGYONG',
            'SUBARU',
            'SUZUKI',
            'TATA (TELCO)',
            'TESLA',
            'TOYOTA',
            'VOLVO',
        ];

        foreach($makes as $make){
            VehicleMake::firstOrCreate(['name' =>$make], ['name' =>$make]);
        }
    }
}
