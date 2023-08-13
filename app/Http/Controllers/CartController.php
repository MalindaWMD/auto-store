<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartItemResource;
use App\Http\Resources\CartResource;
use Illuminate\Http\Request;
use Lunar\Facades\CartSession;
use Lunar\Facades\ShippingManifest;
use Lunar\Models\Cart;
use Lunar\Models\ProductVariant;

class CartController extends Controller
{
    public function index()
    {
        $cart = cart();
        return self::success($cart ? new CartResource($cart) : null);
    }

    public function add(Request $request)
    {
        if( ! auth()->check()){
            return $this->fail('Signin required', 401);
        }

        $this->validate($request, [
            'variant' => 'required'
        ]);

        $productVariant = ProductVariant::find($request->variant);
        
        cart()->add($productVariant, $request->get('qty', 1));

        return $this->success(new CartItemResource($productVariant));
    }

    public function getShippingOptions()
    {
        $cart = cart();

        if(! $cart) {
            return $this->fail('No shipping options', 404);
        }

        return $this->success(ShippingManifest::getOptions($cart));
    }
}