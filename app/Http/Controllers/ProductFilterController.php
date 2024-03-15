<?php

namespace App\Http\Controllers;

use App\Models\ProductType;
use Illuminate\Http\Request;
use Lunar\Models\Brand;

class ProductFilterController extends Controller
{
    private $filters = [];

    public function index(Request $request)
    {
        $this->addFilter('types', 'Product types', 'select');
        $this->addFilter('brands', 'Brands');

        return self::success($this->filters, false);
    }

    private function addFilter($key, $name, $inputType='checkbox')
    {
        $options = [];

        $filterFunction = 'get' . ucfirst($key);
        if(method_exists($this, $filterFunction)){
            $options = $this->{$filterFunction}();
        }

        $this->filters[] = [
            'key' => $key,
            'name' => $name,
            'type' => $inputType,
            'options' => $options,
        ];
    }

    private function getBrands()
    {
        return Brand::select(['id', 'name'])->get();
    }

    private function getTypes()
    {
        return ProductType::select(['id', 'name'])->where('name', '!=', 'Stock')->get();
    }
}
