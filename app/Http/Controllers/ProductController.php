<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\SimpleProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::published()->newQuery();

        // search
        if($request->q){
            $query->search($request->q);
        }

        // type filter
        // ASSUMING IT"S AN INT
        if($request->type){
            $query->where('product_type_id', $request->type);
        }

        // brand
        if($request->brand){
            $query->where('brand_id', $request->brand);
        }

        $prodcuts = $query->get();

        return self::success(SimpleProductResource::collection($prodcuts));
    }

    /**
     * Display a listing of the resource, for the given query
     */
    public function search(Request $request)
    {
        if( ! $request->q){
            return $this->index();
        }

        // VALIDATE

        $prodcuts = Product::search($request->q)->get();

        return self::success(SimpleProductResource::collection($prodcuts));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $product = Product::bySlug($slug)->first();

        if( ! $product){
            return self::fail('Resource not found', 404);
        }

        return self::success( new ProductResource($product) );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}