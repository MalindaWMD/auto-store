<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class VehicleMake extends Model
{
    use HasFactory;

    CONST CACHE_PREFIX = 'vehicle_makers';

    public $timestamps = false;

    protected $guarded = [];

    protected static function booted()
    {
        parent::boot();

        static::saved(function (VehicleMake $make) {
            \Cache::forget(self::CACHE_PREFIX);
        });
    }

    public function scopeActive(Builder $query) 
    {
        $query->where('active', true);
    }

    public function models()
    {
        return $this->hasMany(VehicleModel::class, 'maker_id');
    }

    public function getActive()
    {
        $key = self::CACHE_PREFIX;

        if($result = \Cache::get($key)){
            return $result;
        }

        $result = self::active()->get();

        \Cache::forever($key, $result);

        return $result;
    }
}
