<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\FormatAttributes;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    use FormatAttributes;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'price' => $this->getPrice(),
            'product' => $this->getProduct(),
            'quantity' => $request->get('qty', 1),
        ];
    }

    private function getPrice()
    {
        $price = $this->prices->first();
        return $price->compare_price ? $price->compare_price->value : $price->price->value;
    }

    private function getProduct()
    {
        $product = $this->product->only('id');

        $attributes = $this->product->attribute_data->only(['serial_no', 'name']);

        foreach($attributes as $name => $attr){
            $product[$name] = $this->getAttributeValue($attr, $this->getLocale());
        }

        $product['media'] = $this->getImageData($this->product->getMedia('images')->first());

        return $product;
    }
}
