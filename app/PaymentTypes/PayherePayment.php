<?php

namespace App\PaymentTypes;

use Lunar\PaymentTypes\AbstractPayment;
use Lunar\Base\DataTransferObjects\PaymentCapture;
use Lunar\Base\DataTransferObjects\PaymentRefund;
use Lunar\Base\DataTransferObjects\PaymentAuthorize;
use Lunar\Models\Transaction;

class PayherePayment extends AbstractPayment
{
    /**
     * {@inheritDoc}
     */
    public function authorize(): PaymentAuthorize
    {
        \DB::transaction(function () {
            $this->order->update([
                'status' => 'payment-received',
                'placed_at' => now(),
            ]);

            $this->order->transactions()->create([
                'success' => true,
                'driver' => 'payhere',
                'amount' => $this->order->total,
                'reference' => date('Ymdhis'),
                'status' => 'settles',
                'card_type' => 'visa',
                'type' => 'capture',
                'last_four' => '1234',
            ]);
        });

        return new PaymentAuthorize(true);
    }

    /**
     * {@inheritDoc}
     */
    public function refund(Transaction $transaction, int $amount = 0, $notes = null): PaymentRefund
    {
        // ...
        return new PaymentRefund(true);
    }

    /**
     * {@inheritDoc}
     */
    public function capture(Transaction $transaction, $amount = 0): PaymentCapture
    {
        // ...
        return new PaymentCapture(true);
    }
}
