<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleEngine extends Model
{
    use HasFactory;

    public $timestamps = false;


    public function scopeActive(Builder $query) 
    {
        $query->where('active', true);
    }

    public static function getActiveByModel($modelId)
    {
        return self::active()->where('model_id', $modelId)->get();
    }
}
