<?php

namespace App\Observers;

use App\Models\Product;

class ProductObserver
{
    /**
     * Called when we're about to index the product
     **/
    public function indexing(Product $product)
    {
        $product->addSearchableAttribute('name', $product->attribute_data->name);
        $product->addSearchableAttribute('maker', $product->attribute_data->maker);
        $product->addSearchableAttribute('model', $product->attribute_data->model);
        $product->addSearchableAttribute('engine', $product->attribute_data->engine);
        $product->addSearchableAttribute('serial_no', $product->serial_no);
    }

    /**
     * Called when we are setting up the index via
     * php artisan lunar:meilisearch:update
     * */
    public function searchSetup(Product $product)
    {
        $product->addFilterableAttributes([
            'name',
            $product->attribute_data->name
        ]);
    }
}
