<?php

namespace App\Http\Controllers;

use App\Events\OrderCreated;
use App\Http\Controllers\Traits\CheckoutUtils;
use App\Http\Requests\CheckoutRequest;
use App\Http\Resources\OrderResource;
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

            $cart->calculate();
            
            // create order
            $order = $cart->createOrder();

            OrderCreated::dispatch($order);

            CartSession::forget();

            app(PaymentController::class)->store($order->id);

            $hash = strtoupper(
                md5(
                    211526 . 
                    $order->reference . 
                    number_format($order->total->value, 2, '.', '') . 
                    'LKR' .  
                    strtoupper(md5('MjM4Mjk2NzMzOTI1ODgyOTg3NDkyMjE2MjEyNjMzNDE1MjE4NTMx')) 
                ) 
            );

            $order->hash = $hash;

            return $this->success(new OrderResource($order));

        } catch(CartException $e){
            \Log::debug('CheckoutController(store): Order exists for the cart. ' . json_encode([$cart->id, $e->getMessage(), $e->getLine(), $e->getFile()]));
            return $this->fail($e->getMessage(), 422, self::CART_ERROR_ORDER_EXISTS);
        } catch (\Exception $e) {
            dd($e);
            \Log::debug('CheckoutController(store): Error creating order. ' . json_encode([$cart->id, $e->getMessage(), $e->getLine(), $e->getFile()]));
        }

        return $this->fail('Something went wront while creating order. Please try again.');
    }
}