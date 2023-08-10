<?php

namespace App\Http\Controllers;

use App\Models\VehicleEngine;
use App\Models\VehicleMake;
use App\Models\VehicleModel;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function getMakes()
    {
        return self::success(VehicleMake::active()->get());
    }

    public function getModels($id)
    {
        return self::success(VehicleModel::getActiveByMaker($id));
    }

    public function getEngines($id)
    {
        return self::success(VehicleEngine::getActiveByModel($id));
    }
}
