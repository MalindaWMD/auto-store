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
    public function index()
    {
        return self::success(SimpleProductResource::collection(Product::latest()->get()));
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