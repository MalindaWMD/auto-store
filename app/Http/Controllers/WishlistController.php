<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|numeric',
        ]);

        sleep(2);

        try {
            $user = auth()->user();

            if(! $user){
                return self::fail('Unauthenticated', 401);
            }

            $wishlist = $user->wishlist()->firstOrCreate();
            if( ! $wishlist){
                return self::fail('Error adding item to the wishlist.');
            }

            $exists = $wishlist->items()->where('product_id', $request->product_id)->exists();

            if(!$exists){
                $wishlist->items()->create([
                    'product_id' => $request->product_id,
                ]);
            }
    
            return self::success('Wishlist updated.');
        } catch (\Exception $e) {
            \Log::error('WishlistController(add): Error adding: ' . json_encode([$e->getMessage(), $e->getFile(), $e->getLine()]));
        }

        return self::fail('Error adding item to the wishlist.');
    }
}
