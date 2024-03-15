<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Lunar\Models\Brand;

class ProductFilterController extends Controller
{
    public function index(Request $request)
    {
        $brands = Brand::all();

        $filters = [
            [
                'key' => 'brand',
                'name' => 'Brands',
                'options' => $brands,
            ]
        ];

        return self::success($filters, false);
    }

    public function getBrands(Request $request)
    {
        $brands = Brand::all();

        return self::success($brands, false);
    }
}
