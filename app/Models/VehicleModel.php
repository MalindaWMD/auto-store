<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class VehicleModel extends Model
{
    use HasFactory;

    CONST CACHE_PREFIX = 'vehicle_models_';

    public $timestamps = false;

    protected $guarded = [];

    protected static function booted()
    {
        parent::boot();

        static::saving(function (VehicleModel $model) {
            $model->alias = \Str::slug($model->name);
        });

        static::saved(function (VehicleModel $model) {
            \Cache::forget(self::CACHE_PREFIX.$model->maker_id);
        });
    }
    
    public function scopeActive(Builder $query) 
    {
        $query->where('active', true);
    }

    public function make()
    {
        return $this->belongsTo(VehicleMake::class);
    }

    public function engines()
    {
        return $this->hasMany(VehicleEngine::class, 'model_id');
    }

    public function scopeGrouped()
    {
        return $this->get()->groupBy('group_name')->toBase();
    }

    public static function getActiveByMaker($makerId)
    {
        $key = self::CACHE_PREFIX.$makerId;

        if($result = \Cache::get($key)){
            return $result;
        }

        $result = self::active()->where('maker_id', $makerId)->whereHas('engines')->get();

        \Cache::forever($key, $result);

        return $result;
    }
}
