<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\FormatAttributes;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    use FormatAttributes;

    public $mandatoryAttributes = ['serial_no', 'name', 'short_description', 'description'];

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge($this->getBasicDetails($this), [
            'variants' => $this->variants,
            'associations' => $this->getAssociations(),
        ]);
    }

    public function getBasicDetails($product, $simple = false)
    {
        $media = $product->getMedia('images');

        $data = [
            'id' => $product->id,
            'brand' => $this->getBrand(),
            'slug' => $product->slug,
            'prices' => $this->getSimplePrices(),
            'images' => $simple ? $this->getImageData($media->first()) : $media,
            'ratings' => $this->ratings,
            'additional_data' => $this->getAdditionalAttributes(),
        ];

        return array_merge($data, $this->getMandatoryAttributes());
    }

    public function getMandatoryAttributes()
    {
        return $this->getAttributeValuesList($this->mandatoryAttributes);
    }

    public function getAdditionalAttributes()
    {
        return $this->getAttributeValuesList($this->attribute_data->except($this->mandatoryAttributes), true);
    }

    public function getSimplePrices()
    {
        $prices = [];
        foreach ($this->prices as $price) {
            $prices[] = $this->formatPrice($price);
        }

        return $prices;
    }

    public function formatPrice($price)
    {
        return [
            'price' => $price->price->value,
            'discounted_price' => $price->compare_price->value,
            'variant_id' => $price->priceable['id'],
            'variant_sku' => $price->priceable->sku,
        ];
    }

    public function getAssociations()
    {
        $dbAssociations = $this->associations()->with('target')->get();
        $associations = [];

        foreach ($dbAssociations as $assoc) {
            $associations[] = $this->getBasicDetails($assoc->target, true);
        }

        return $associations;
    }

    public function getBrand()
    {
        return [
            'name' => $this->brand->name,
            'image' => $this->brand->getMedia('images')->first()?->original_url,
        ];
    }
}