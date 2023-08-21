<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use App\Mail\BackOrderList;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderCreatedListener implements ShouldQueue
{
    /**
     * The name of the queue the job should be sent to.
     *
     * @var string|null
     */
    public $queue = 'order-created';

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderCreated $event): void
    {
        $backorderList = [];

        $order = $event->order;
        $order->load('productLines.purchasable');

        foreach($order->productLines as $line){
            $variant = $line->purchasable;

            $newQty = max(0, $variant->stock - $line->quantity);

            $variant->update(['stock' => $newQty]);

            // If updated qty is equals or less than backorder, add to the list
            if($newQty <= $variant->backorder){
                $backorderList[] = $variant->id;
            }
        }

        if(count($backorderList) > 0){
            \Mail::to('wmdmalinda@gmail.com')->queue(new BackOrderList($backorderList));
        }
    }
}
