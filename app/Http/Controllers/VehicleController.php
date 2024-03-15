<?php

namespace App\Http\Controllers;

use App\Models\VehicleEngine;
use App\Models\VehicleMake;
use App\Models\VehicleModel;
use App\Models\VehicleRequest;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function getMakes()
    {
        return self::success(VehicleMake::getActive());
    }

    public function getModels($id)
    {
        return self::success(VehicleModel::getActiveByMaker($id));
    }

    public function getEngines($id)
    {
        return self::success(VehicleEngine::getActiveByModel($id));
    }

    public function add(Request $request)
    {
        $request->validate([
            'make' => 'required',
            'model' => 'required',
            'year' =>  'required|digits:4|integer|min:1900|max:' . date('Y'),
            'email' => 'nullable|email',
        ], [
            'year.required' => 'Invalid year value',
            'year.digits' => 'Invalid year value',
            'year.integer' => 'Invalid year value',
            'year.min' => 'Invalid year value',
            'year.max' => 'Invalid year value',
        ]);
        
        try {
            VehicleRequest::create([
                'make' => $request->make,
                'model' => $request->model,
                'year' => $request->year,
                'vin' => $request->vin,
                'requester_email' => $request->email,
            ]);
    
            return self::success('Your request has been submitted');
        } catch (\Exception $e) {
            \Log::error('VehicleController(add): Error adding: ' . json_encode([$e->getMessage(), $e->getFile(), $e->getLine()]));
        }

        return self::success('Your request has been submitted');
    }
}
