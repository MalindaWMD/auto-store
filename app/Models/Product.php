<?php

namespace App\Models;

use App\Models\Traits\Rateable;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

class Product extends \Lunar\Models\Product
{
    use Rateable;

    public static $cacheAttributesPrefix = 'product_type_attributes_';

    protected static function booted()
    {
        parent::boot();

        static::saving(function (Product $product) {
            // update slug
            $name = $product->attribute_data->get('name')->getValue()->first()->getValue();
            $product->slug = Str::slug("$name-{$product->id}");

            // Update OE Numbers in products table for easier search
            $product->oe_numbers = optional($product->attribute_data->get('oe_numbers'))->getValue();
        });
    }

    public function scopeBySlug(Builder $query, $slug)
    {
        return $this->where('slug', $slug);
    }

    public function scopePublished(Builder $query) 
    {
        $query->where('status', 'published');
    }

    public function attributeNames()
    {
        if($attributeList = \Cache::get(self::$cacheAttributesPrefix . $this->product_type_id)){
            return $attributeList;
        }

        $mappedAttributeList = $this->mappedAttributes()->pluck('name', 'handle');

        $attributeList = [];
        foreach ($mappedAttributeList as $handle => $attr) {
            $attributeList[$handle] = $attr->get(app()->getLocale());
        }

        \Cache::put(self::$cacheAttributesPrefix . $this->product_type_id, $attributeList, 60 * 60 * 24);

        return $attributeList;
    }

    public function vehicles()
    {
        return $this->belongsToMany(Vehicle::class, 'product_vehicles', 'product_id', 'vehicle_id');
    }
}