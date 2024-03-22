<?php

use Lunar\Facades\CartSession;
use Lunar\Models\Cart;

if (!function_exists('cart')) {
    function cart()
    {

        $cartToken = request()->cookie(config('lunar.cart.cookie_key'));

        if ($cartToken) {
            $cart = Cart::where('id', $cartToken)->first();
            if ($cart) {
                $cart->calculate();
                CartSession::use($cart);
                return $cart;
            }
        }

        $cart = Cart::firstOrCreate(
            [
                'user_id' => null,
                'order_id' => null,
            ],
            [
                'currency_id' => CartSession::getCurrency()->id,
                'channel_id' => CartSession::getChannel()->id,
            ]
        );

        $cart->calculate();

        CartSession::use($cart);

        return $cart;
    }
}
