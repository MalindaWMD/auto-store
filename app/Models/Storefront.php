<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Storefront extends Model
{
    use HasFactory;

    const CACHE_PREFIX = 'storefront_';

    public $table = 'storefront';

    protected $guarded = [];

    public static function get($key)
    {
        if($cacheValue = \Cache::get(self::CACHE_PREFIX.$key)){
            return $cacheValue;
        }

        $record = self::where('key', $key)->first();

        if($record){
            \Cache::put(self::CACHE_PREFIX.$key, $record->value, now()->endOfDay());
            
            return $record->value;
        }

        return null;
    }

    public static function set($key, $value)
    {
        $record = self::get($key);
        
        if( ! $record){
            return self::create([
                'key' => $key,
                'value' => $value,
            ]);
        }

        $record->value = $value;
        return $record->save();
    }
}
