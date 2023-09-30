<?php

return [
    'sandbox' => env('PAYHERE_SANDBOX', true),
    'merchant_id' => env('PAYHERE_MERCHANT_ID', ''),
    'merchant_secret' => env('PAYHERE_MERCHANT_SECRET', ''),
    'return_url' => env('PAYHERE_RETURN_URL', ''),
    'cancel_url' => env('PAYHERE_CANCEL_URL', ''),
    'notify_url' => env('PAYHERE_NOTIFY_URL', ''),
    'currency' => env('PAYHERE_CURRENCY', 'LKR'),
];