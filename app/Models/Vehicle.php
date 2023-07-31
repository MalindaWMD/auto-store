<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $guarded = [];

    public function make()
    {
        return $this->belongsTo(VehicleMake::class, 'maker_id');
    }

    public function model()
    {
        return $this->belongsTo(VehicleModel::class, 'model_id');
    }

    public function engine()
    {
        return $this->belongsTo(VehicleEngine::class, 'engine_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
