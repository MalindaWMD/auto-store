<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\FormatAttributes;
use App\Http\Resources\Traits\FormatCartItems;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    use FormatAttributes, FormatCartItems;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'price' => $this->getPrice($this),
            'product' => $this->getProduct($this),
            'quantity' => $request->get('qty', 1),
        ];
    }

}
