<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\FormatAttributes;
use Illuminate\Http\Request;

class SimpleProductResource extends ProductResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'brand' => $this->brand->name,
            'price' => $this->formatPrice($this->prices->first()),
            'slug' => $this->slug,
            'image' => $this->getImageData($this->getMedia('images')->first()),
            'rating' => [
                'average' => (float)$this->averageRating, 
                'total_ratings' => $this->timesRated()
            ],
            'stock' => $this->getStockData(),
            'additional_data' => $this->getAdditionalAttributes(),
        ];

        return array_merge($data, $this->getAttributeValuesList($this->mandatoryAttributes));
    }

    private function getStockData()
    {
        $stock = $this->variants->first();
        
        return [
            'available' => $stock->stock > 0,
            'sku' => $stock->sku,
            'purchasable' => $stock->purchasable,
        ];
    }
}
