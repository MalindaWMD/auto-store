<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FrontendUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = $this->only(['id', 'name', 'email', 'phone_no']);

        $customer = $this->customers()->first();

        $data['customer'] = $customer;
        $data['customer']['address'] = $customer?->addresses()->latest()->first();

        return $data;
    }
}
