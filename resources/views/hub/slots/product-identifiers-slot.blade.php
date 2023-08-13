<div class="shadow sm:rounded-md">
   <div class="flex-col px-4 py-5 space-y-4 bg-white rounded-md sm:p-6">
    <header class="flex items-center justify-between">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Identifiers</h3>
    </header>

		@if($sku)
			<x-hub::input.group :label="'SKU'" for="sku">
				<x-hub::input.text wire:model="sku" id="sku" readonly/>
			</x-hub::input.group>
		@endif

		<x-hub::input.group :label="'Serial no/Article no'" for="serial_no">
			<x-hub::input.text wire:model="serialNo" id="serial_no"/>
		</x-hub::input.group>

		<x-hub::input.group :label="'External serial no'" for="external_serial_no">
			<x-hub::input.text wire:model="externalSerialNo" id="external_serial_no"/>
		</x-hub::input.group>
		
   </div>
</div>