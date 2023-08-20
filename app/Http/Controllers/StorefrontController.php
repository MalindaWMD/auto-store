<?php

namespace App\Http\Controllers;

use App\Models\Storefront;
use Illuminate\Http\Request;
use Lunar\Facades\StorefrontSession;

class StorefrontController extends Controller
{
    public function getSiteData()
    {
        return $this->success([
            'currency' => StorefrontSession::getCurrency(),
            'home-top-content' => Storefront::get('home-top-categories'),
        ]);
    }
}
