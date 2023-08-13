<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleEngine extends Model
{
    use HasFactory;

    CONST CACHE_PREFIX = 'vehicle_engines_';

    public $timestamps = false;


    public function scopeActive(Builder $query) 
    {
        $query->where('active', true);
    }

    public static function getActiveByModel($modelId)
    {
        $key = self::CACHE_PREFIX.$modelId;

        if($result = \Cache::get($key)){
            return $result;
        }

        $result = self::active()->where('model_id', $modelId)->get();

        \Cache::forever($key, $result);

        return $result;
    }
}
