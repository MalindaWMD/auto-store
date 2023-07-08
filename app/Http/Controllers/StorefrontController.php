<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Lunar\Facades\StorefrontSession;

class StorefrontController extends Controller
{
    public function getSiteData()
    {
        return $this->success([
            'currency' => StorefrontSession::getCurrency(),
        ]);
    }
}
