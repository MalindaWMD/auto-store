<div class="overflow-hidden shadow sm:rounded-md">
	<div class="flex-col px-4 py-5 space-y-4 bg-white sm:p-6">
		<header>
			<h3 class="text-lg font-medium leading-6 text-gray-900">
				{{$this->getSlotTitle()}}
			</h3>
		</header>

		<div class="space-y-4">
			<div class="grid grid-cols-2 gap-4">
				<x-hub::input.group :label="'Title'" for="seo-title" :error="$errors->first('title')">
					<x-hub::input.text wire:model="title" id="seo-title" :error="$errors->first('title')" />
				</x-hub::input.group>
			</div>
			<div class="">
				<div>
					<x-hub::input.group :label="'Description'" for="seo-description" :error="$errors->first('description')">
						<x-hub::input.textarea wire:model="description" id="seo-description" :error="$errors->first('description')" />
					</x-hub::input.group>
				</div>
			</div>
		</div>
	</div>
</div>