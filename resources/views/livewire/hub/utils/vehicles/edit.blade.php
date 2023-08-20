<div class="flex-col space-y-4">
	<div>
		<strong class="text-xl font-bold md:text-2xl mb-4">
			{{ ucfirst($this->mode) }} Vehicle Maker
		</strong>
    </div>

	<div class="overflow-hidden shadow sm:rounded-md mb-4">
		<form wire:submit.prevent="{{ $this->getSubmitAction() }}">
			<div class="flex-col px-4 py-5 space-y-4 bg-white sm:p-6">
				<x-hub::input.group :label="'Name'" for="name" :error="$errors->first('make.name')" required>
					<x-hub::input.text wire:model="make.name" name="name" id="name" :error="$errors->first('make.name')" />
				</x-hub::input.group>
	
				<div>
					<label for="">
						Active: 
						<x-hub::input.checkbox wire:model="make.active"/>
						<x-hub::errors :error="$errors->first('model.active')" />
					</label>
				</div>
			</div>
			<div class="w-full flex justify-between items-center px-6 py-2">
				<a href="{{ route('hub.utils.vehicles.index') }}" class="py-2 px-4 text-sm border-transparent bg-gray-400 text-white hover:bg-gray-500 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-sm border inline-flex justify-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2">
					Back to Makers
				</a>
				<button class="py-2 px-4 text-sm border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-sm border inline-flex justify-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2" type="submit">
					  Save
				</button>
			</div>
		</form>
	</div>

	@if($this->mode == 'edit')
		<div class="pt-6">
			<div class="flex justify-between items-center mb-4">
				<h4 class="text-xl font-medium">Available Models</h4>
				<a href="{{ route('hub.utils.vehicles.models.create', [$this->make->id]) }}" class="py-2 px-4 text-sm border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-sm border inline-flex justify-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2">
					Create model
				</a>
			</div>
			@livewire('hub.utils.vehicles.models.vehicle-models-table')
		</div>
	@endif
</div>