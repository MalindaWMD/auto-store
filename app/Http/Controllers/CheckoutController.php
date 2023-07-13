<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\CheckoutUtils;
use App\Http\Requests\CheckoutRequest;
use Lunar\Exceptions\Carts\CartException;
use Lunar\Facades\CartSession;

class CheckoutController extends Controller
{
    use CheckoutUtils;

    const CART_ERROR_EMPTY = 'cart_empty';
    const CART_ERROR_ORDER_EXISTS = 'cart_order_exists';

    protected $shippingAddress;
    protected $billingAddress;

    protected $basicAddressFields = ['line_one', 'line_two', 'city', 'state', 'postcode', 'delivery_instructions', 'contact_email', 'contact_phone', 'first_name', 'last_name'];

    public function store(CheckoutRequest $request)
    {
        try {
            $cart = cart();

            if ($this->isCartEmpty($cart)) {
                return $this->fail('Your cart is empty', 422, self::CART_ERROR_EMPTY);
            }

            // Set contact info to billing address
            $inputData = $this->formatRequestData($request->all());

            // Save and set shipping and billing addresses
            $this->saveAddresses($inputData['shippingAddress'], $inputData['billingAddress']);

            // Set addresses to cart
            $cart->setShippingAddress($this->shippingAddress);
            $cart->setBillingAddress($this->billingAddress);

            // Set shipping option
            $cart->setShippingOption($this->getShippingOption($cart, $request->shippingOption));

            // create order
            $order = $cart->createOrder();

            CartSession::forget();

            return $this->success($order);

        } catch(CartException $e){
            \Log::debug('CheckoutController(store): Order exists for the cart. ' . json_encode([$cart->id, $e->getMessage(), $e->getLine(), $e->getFile()]));
            return $this->fail($e->getMessage(), 422, self::CART_ERROR_ORDER_EXISTS);
        } catch (\Exception $e) {
            \Log::debug('CheckoutController(store): Error creating order. ' . json_encode([$cart->id, $e->getMessage(), $e->getLine(), $e->getFile()]));
        }

        return $this->fail('Something went wront while creating order. Please try again.');
    }
}