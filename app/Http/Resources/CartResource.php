<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\FormatAttributes;
use App\Http\Resources\Traits\FormatCartItems;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    use FormatAttributes, FormatCartItems;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if(!$this){
            return [];
        }

        $this->load('lines.purchasable');
        $items = $this->lines->map(function ($line) {
            return [
                'id' => $line->purchasable->id,
                'price' => $this->getPrice($line->purchasable),
                'product' => $this->getProduct($line->purchasable),
                'quantity' => $line->quantity,
            ];
        });

        return [
            'id' => $this->id,
            'items' => $items,
            'items_count' => count($items),
            // 'total' => $this->total ? $this->total->value : 0,
            // 'discount_total' => $this->discountTotal ? $this->discountTotal->value : 0,
            // 'sub_total' => $this->subTotal ? $this->subTotal->value : 0,
            // 'sub_total_discounted' => $this->subTotalDiscounted ? $this->subTotalDiscounted->value : 0,
            'total' => $this->total ? $this->total->value : 0,
'subTotal' => $this->subTotal ? $this->subTotal->value : 0,
'subTotalDiscounted' => $this->subTotalDiscounted ? $this->subTotalDiscounted->value : 0,
'shippingTotal' => $this->shippingTotal ? $this->shippingTotal->value : 0,
'discountTotal' => $this->discountTotal ? $this->discountTotal->value : 0,
'shippingSubTotal' => $this->shippingSubTotal ? $this->shippingSubTotal->value : 0,
'shippingTotal' => $this->shippingTotal ? $this->shippingTotal->value : 0,
        ];
    }
}