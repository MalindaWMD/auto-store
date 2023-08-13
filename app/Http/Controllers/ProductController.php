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
        $query = Product::with('brand');

        // search
        if($request->q){
            $query = Product::search($request->q);
        }

        if($request->collection){
            $query->whereHas('collections', function($q) use($request) {
                $q->where(config('lunar.database.table_prefix').'collections.id', $request->collection);
            });
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

        if($request->maker && $request->model && $request->engine){
            $code = "{$request->maker}:{$request->model}:{$request->engine}";
            $query->where('related_vehicles', 'LIKE', "%$code%");
        }

        $prodcuts = $query->where('status', 'published')->latest()->paginate(20);

        return self::success(SimpleProductResource::collection($prodcuts), true);
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