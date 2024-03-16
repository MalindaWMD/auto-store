<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Lunar\Models\Product;

class WishlistItem extends Model
{
    use HasFactory;

    public $guarded = [];
    
    public $with = [
        'product'
    ];

    public function wishlist()
    {
        return $this->belongsTo(Wishlist::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
