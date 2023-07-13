<?php

namespace App\Http\Resources\Traits;

trait FormatCartItems
{
    private function getPrice($item)
    {
        $price = $item->prices->first();
        return $price->compare_price ? $price->compare_price->value : $price->price->value;
    }

    private function getProduct($item)
    {
        $product = $item->product->only('id');

        $attributes = $item->product->attribute_data->only(['serial_no', 'name']);

        foreach($attributes as $name => $attr){
            $product[$name] = $this->getAttributeValue($attr, $this->getLocale());
        }

        $product['media'] = $this->getImageData($item->product->getMedia('images')->first());

        return $product;
    }
}