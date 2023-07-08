<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends \Lunar\Models\ProductType
{

    protected static function booted()
    {
        parent::boot();

        static::saved(function (ProductType $type) {
            \Cache::forget('mapped_attributes');
        });
    }

}
