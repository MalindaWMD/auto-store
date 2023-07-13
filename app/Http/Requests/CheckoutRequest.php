<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function attributes()
    {
        return [
            'shippingAddress' => 'shipping address',
            'shippingAddress.contact_phone' => 'contact no',
            'shippingAddress.contact_email' => 'email',
            'shippingAddress.first_name' => 'first name',
            'shippingAddress.last_name' => 'last name',
            'shippingAddress.line_one' => 'address',
            'shippingAddress.line_two' => 'street',
            'shippingAddress.delivery_instructions' => 'delivery_instructions',
            'shippingAddress.city' => 'city',
            'shippingAddress.state' => 'state',
            'shippingAddress.postcode' => 'postcode',

            'billingAddress.first_name' => 'first name',
            'billingAddress.last_name' => 'last name',
            'billingAddress.line_one' => 'address',
            'billingAddress.line_two' => 'street',
            'billingAddress.city' => 'city',
            'billingAddress.state' => 'state',
            'billingAddress.postcode' => 'postcode',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'shippingAddress' => 'required',
            'shippingAddress.contact_phone' => 'required|numeric|min_digits:10|max_digits:10',
            'shippingAddress.contact_email' => 'required|email',
            'shippingAddress.first_name' => 'required|string',
            'shippingAddress.last_name' => 'required|string',
            'shippingAddress.line_one' => 'required|alpha_num',
            // 'shippingAddress.delivery_instructions' => 'sometimes|alpha_num',
            'shippingAddress.city' => 'required|string',
            'shippingAddress.state' => 'required|string',
            'shippingAddress.postcode' => 'required|numeric|min_digits:5|max_digits:5',
        ];

        if($this->billingAddress){
            $rules = array_merge($rules, [
                'billingAddress.first_name' => 'required|string',
                'billingAddress.last_name' => 'required|string',
                'billingAddress.line_one' => 'required|alpha_num',
                'billingAddress.city' => 'required|string',
                'billingAddress.state' => 'required|string',
                'billingAddress.postcode' => 'required|numeric|min_digits:5|max_digits:5',
            ]);
        }

        return $rules;
    }
}