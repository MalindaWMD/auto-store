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
            'variant' => 'required|numeric'
        ]);

        $productVariant = ProductVariant::find($request->variant);
        
        cart()->add($productVariant, $request->get('qty', 1));

        return $this->success(new CartItemResource($productVariant));
    }

    public function clear()
    {
        if( ! auth()->check()){
            return $this->fail('Signin required', 401);
        }

        cart()->clear();

        return $this->success('Cart cleared');
    }

    public function updateItem(Request $request)
    {
        try{
            $request->validate([
                'variant' => 'required|numeric',
                'action' => 'required|string|in:add,subtract',
            ]);
            
            // get product variant
            $productVariant = ProductVariant::find($request->variant);
    
            $cartLine = $this->getCartItem($productVariant->id);

            if( ! $cartLine){
                return $this->fail('Item not found', 500);
            }

            $cartLine->quantity = $this->getUpdateQty($cartLine->quantity, $request->action);
    
            cart()->updateLine($cartLine->id,  $cartLine->quantity);

            unset($cartLine->purchasable, $cartLine->cart);

            return $this->success($cartLine);
            
        }catch(\Exception $e){
            \Log::error('CartController(updateItem): Error updating cart line. ' . json_encode([$e->getMessage(), $e->getLine(), $e->getFile()]));
        }

        return $this->fail('Error updating cart item', 500);
    }

    public function removeItem(Request $request)
    {
        try{
            $request->validate([
                'variant' => 'required|numeric',
            ]);
            
            // get product variant
            $productVariant = ProductVariant::find($request->variant);
    
            $cartLine = $this->getCartItem($productVariant->id);

            if( ! $cartLine){
                return $this->fail('Item not found', 500);
            }

            cart()->remove($cartLine->id);

            return $this->success([
                'removed_item' => $productVariant->id
            ]);
            
        }catch(\Exception $e){
            \Log::error('CartController(removeItem): Error removing cart line. ' . json_encode([$e->getMessage(), $e->getLine(), $e->getFile()]));
        }

        return $this->fail('Error removing cart item', 500);
    }

    public function getShippingOptions()
    {
        $cart = cart();

        if(! $cart) {
            return $this->fail('No shipping options', 404);
        }

        return $this->success(ShippingManifest::getOptions($cart));
    }

    private function getUpdateQty($qty, $action)
    {
        if($action == 'add'){
            return $qty + 1;
        }else if($action == 'subtract'){
            return $qty == 1 ? $qty : $qty - 1;
        }

        return $qty;
    }

    private function getCartItem($variantId)
    {
        $cartLine = null;
        foreach (cart()->lines as $line) {
            if($line->purchasable->id == $variantId){
                $cartLine = $line;
                break;
            }
        }

        return $cartLine;
    }
}