<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use Lunar\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->check()) {
            return $this->fail('No auth user', 401);
        }

        $orders = Order::latest()->where('user_id', auth()->id())->paginate(10);

        return self::success(OrderResource::collection($orders), true);
    }
}
