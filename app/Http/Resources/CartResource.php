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
            'items' => $items
        ];
    }
}