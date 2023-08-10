<?php

namespace App\Http\Controllers\Traits;
use Lunar\Facades\ShippingManifest;
use Lunar\Models\Address;

trait CheckoutUtils 
{
    private function isCartEmpty($cart)
    {
        return count($cart->lines) == 0;
    }

    private function formatRequestData($data)
    {
        if (isset($data['billingAddress'])) {
            \Arr::set($data, 'billingAddress.contact_phone', \Arr::get($data, 'shippingAddress.contact_phone'));
            \Arr::set($data, 'billingAddress.contact_email', \Arr::get($data, 'shippingAddress.contact_email'));
        }

        return $data;
    }

    /**
     * Save addresses
     *  if there's an logged in user, compare existing addresses with coming ones and,
     *  store if there are different.
     *  just store the addresses otherwise.
     */
    private function saveAddresses($shippingAddress, $billingAddress)
    {
        if (auth()->check()) {
            $lastAddress = auth()->user()->customer()->addresses->last()?->toArray();

            if ($this->isADifferentAddress($lastAddress, $shippingAddress)) {
                $this->shippingAddress = $this->saveAddress($shippingAddress);
            }else{
                $this->shippingAddress = $lastAddress;
            }

            if ($billingAddress && $this->isADifferentAddress($lastAddress, $billingAddress)) {
                $this->billingAddress = $this->saveAddress($billingAddress);
            }else{
                $this->billingAddress = $this->shippingAddress;
            }

            return;
        }

        $this->shippingAddress = $this->saveAddress($shippingAddress);

        if ($billingAddress) {
            $this->billingAddress = $this->saveAddress($billingAddress);
        } else {
            $this->billingAddress = $this->shippingAddress;
        }
    }

    private function isADifferentAddress($existing, $address)
    {
        if( ! $existing){
            return true;
        }

        return count(array_diff_assoc(\Arr::only($existing, $this->basicAddressFields), \Arr::only($address, $this->basicAddressFields))) > 0;
    }

    private function saveAddress($data)
    {
        $data = \Arr::only($data, $this->basicAddressFields);
        $data['country_id'] = 1; // Default to first countr. SRI LANKA
        $data['customer_id'] = auth()->check() ?  auth()->user()->customer()->id : null;

        return Address::create($data);
    }

    private function getShippingOption($cart, $requestOption)
    {
        $options = ShippingManifest::getOptions($cart);
        if($requestOption && $identifier = \Arr::get($requestOption, 'identifier')){
            $selected = $options->where('identifier', $identifier)->first();
            if($selected){
                return $selected;
            }
        }

        return $options->first();
    }
}