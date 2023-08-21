<?php

namespace App\Http\Controllers;

use App\PaymentTypes\PayherePayment;
use Illuminate\Http\Request;
use Lunar\Models\Order;

class PaymentController extends Controller
{
    protected $payhere;

    public function __construct(PayherePayment $payhere)
    {
        $this->payhere = $payhere;
    }
    
    /**
     * Store payments
     *
     * @param Request $request
     * @return void
     */
    public function store($orderId)
    {
        $order = Order::find($orderId);

        $this->payhere->order($order);

        return $this->payhere->authorize();
    }
}
