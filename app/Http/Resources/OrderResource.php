<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->load('productLines', 'productLines.purchasable.product');

        $data = $this->only(['id', 'reference', 'created_at', 'updated_at', 'status']);

        $data['shipping_total'] = $this->shipping_total->value;
        $data['sub_total'] = $this->sub_total->value - $data['shipping_total'];
        $data['total'] = $this->total->value;

        $data['lines'] = $this->formatLines();
        $data['shipping_address'] = $this->shippingAddress;
        $data['billing_address'] = $this->billingAddress;

        return $data;
    }

    private function formatLines()
    {
        $lines = [];
        foreach ($this->productLines as $line) {
            $lineData = $line->only(['id', 'description', 'quantity']);
            $lineData['unit_price'] = $line->unit_price->value;
            $lineData['sub_total'] = $line->sub_total->value;
            $lineData['total'] = $line->total->value;
            $lineData['product'] = new SimpleProductResource($line->purchasable->product);
            $lines[] = $lineData;
        }

        return $lines;
    }
}
