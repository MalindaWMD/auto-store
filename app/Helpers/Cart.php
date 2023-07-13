<?php
use Lunar\Facades\CartSession;
use Lunar\Models\Cart;

if (! function_exists('cart')) {
    function cart($userId=null) {
        $cart = CartSession::current();

        if (!$cart && auth()->check()) {
            $cart = Cart::firstOrCreate(
                [
                    'user_id' => auth()->id(),
                    'order_id' => null,
                ],
                [
                    'currency_id' => CartSession::getCurrency()->id,
                    'channel_id' => CartSession::getChannel()->id,
                ]
            );

            CartSession::use($cart);
        }

        return $cart;
    }
}

