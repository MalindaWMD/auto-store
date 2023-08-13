<div class="overflow-hidden shadow sm:rounded-md">
	<div class="flex-col px-4 py-5 space-y-4 bg-white sm:p-6">
		<header>
			<h3 class="text-lg font-medium leading-6 text-gray-900">
				{{$this->getSlotTitle()}}
			</h3>
		</header>

		<div class="grid grid-cols-2 gap-6">
			<div class="space-y-4">
				<x-hub::input.group :label="'Make'" :required="true" for="vehicle_make">
						<x-hub::input.select id="vehicle_make" wire:model="makerId">
							<option value="">Select make</option>
							@foreach($this->makes as $make)
							<option value="{{ $make['id'] }}" wire:key="{{ $make['id'] }}">{{ $make['name'] }}</option>
							@endforeach
						</x-hub::input.select>
					</x-hub::input.group>

				<x-hub::input.group :label="'Model'" :required="true" for="vehicle_model">
					<x-hub::input.select id="vehicle_model" wire:model="modelId">
						<option value="">Select model</option>
						@foreach($this->getModels() as $groupName => $models)
							<optgroup label="{{$groupName}}">
								@foreach ($models as $model)
									<option value="{{ $model['id'] }}" wire:key="{{ $model['id'] }}">{{ $model['name'] }}</option>
								@endforeach
							</optgroup>
						@endforeach
					</x-hub::input.select>
				</x-hub::input.group>
			
				<x-hub::input.group :label="'Engine'" :required="true" for="vehicle_engine">
					<x-hub::input.select id="vehicle_engine" wire:model="engineId">
						<option value="">Select engine</option>
						@foreach($this->engines as $engine)
						<option value="{{ $engine['id'] }}" wire:key="{{ $engine['id'] }}">{{ $engine['name'] }}</option>
						@endforeach
					</x-hub::input.select>
				</x-hub::input.group>
				<button class=" bg-sky-600 rounded-md px-3 py-1 text-white" wire:click="addVehicle">Add</button>
			</div>

			<div class="space-y-4">
				@foreach ($this->vehicles as $code => $vehicle)
						<div class="form-input flex justify-between items-start w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
							<div>
								@foreach (array_keys($vehicle) as $field)
										<p>{{$field}}</p>
								@endforeach
							</div>

							<button wire:click="removeVehicle('{{$code}}')" class="py-1 px-3 text-xs border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 block disabled:cursor-not-allowed disabled:opacity-50 rounded-md">
								Remove
							</button>
						</div>
				@endforeach
			</div>
		</div>

		<hr>

		<x-hub::input.group :label="'OE Numbers'" for="oe_numbers">
			<x-tag-input id="oe_numbers" wire:model="oeNumbers"/>
		</x-hub::input.group>

	</div>
</div>