<?php

namespace App\Models;

use App\Models\Traits\Rateable;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

class Product extends \Lunar\Models\Product
{
    use Rateable;

    public static $cacheTags = ['products'];

    protected static function booted()
    {
        parent::boot();

        static::saving(function (Product $product) {
            $name = $product->attribute_data->get('name')->getValue()->first()->getValue();
            $product->slug = Str::slug("$name-{$product->id}");
        });
    }

    public function scopeBySlug(Builder $query, $slug)
    {
        return $this->where('slug', $slug);
    }

    public function attributeNames()
    {
        return \Cache::remember('mapped_attributes', 60 * 60 * 60 * 24, function () {
            $mappedAttributeList = $this->getModel()->mappedAttributes()->pluck('name', 'handle');

            $attributeList = [];
            foreach ($mappedAttributeList as $handle => $attr) {
                $attributeList[$handle] = $attr->get(app()->getLocale());
            }

            return $attributeList;
        });
    }
}