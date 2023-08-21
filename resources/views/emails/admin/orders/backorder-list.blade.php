@php
    $url = config('app.url') . '/hub/products';
@endphp

<x-mail::message>
# Stock update

Following products have reached the backorder level.

<x-mail::panel>
<x-mail::table>
| SKU           | Name          | Stock    | Backorder  |
| ------------- |:-------------:|:--------:|:----------:|
@foreach ($variants as $variant)
| {{$variant->sku}} | {{$variant->product->attribute_data->get('name')->getValue()->first()->getValue()}} | {{$variant->stock}} | {{$variant->backorder}} |
@endforeach
</x-mail::table>
</x-mail::panel>

<x-mail::button :url="$url">
Visit products page
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
