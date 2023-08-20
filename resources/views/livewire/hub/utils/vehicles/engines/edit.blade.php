<div class="flex-col space-y-4">
	<div>
		<strong class="text-xl font-bold md:text-2xl mb-4">
			Edit Vehicle Engine
		</strong>
    </div>

	<div class="overflow-hidden shadow sm:rounded-md mb-4">
		<form wire:submit.prevent="{{ $this->getSubmitAction() }}">
			<div class="flex-col px-4 py-5 space-y-4 bg-white sm:p-6">
				<div class="grid grid-cols-2 gap-6">
					<x-hub::input.group :label="'Name'" for="name" :error="$errors->first('engine.name')" required>
						<x-hub::input.text wire:model="engine.name" name="name" id="name" :error="$errors->first('engine.name')" />
					</x-hub::input.group>

					<x-hub::input.group :label="'Fuel type'" for="fuel_type" :error="$errors->first('engine.fuel_type')" required>
						<x-hub::input.select wire:model="engine.fuel_type" name="fuel_type" id="fuel_type" :error="$errors->first('engine.fuel_type')">
							<option value="">Select type</option>
							@foreach ($this->fuelTypes as $type)
								<option value="{{$type}}">{{$type}}</option>
							@endforeach
						</x-hub::input.select>
					</x-hub::input.group>
				</div>
	
				<div>
					<label for="">
						Active: 
						<x-hub::input.checkbox wire:model="engine.active"/>
						<x-hub::errors :error="$errors->first('engine.active')" />
					</label>
				</div>
			</div>
			<div class="w-full flex justify-between items-center px-6 py-2">
				<a href="{{ route('hub.utils.vehicles.models.edit', $this->modelId) }}" class="py-2 px-4 text-sm border-transparent bg-gray-400 text-white hover:bg-gray-500 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-sm border inline-flex justify-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2">
					Back to Model
				</a>
				<button class="py-2 px-4 text-sm border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-sm border inline-flex justify-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2" type="submit">
					Save
				</button>
			</div>
		</form>
	</div>
</div>