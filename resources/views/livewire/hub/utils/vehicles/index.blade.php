<div class="flex-col space-y-4">
	<div class="flex justify-between items-center">
		<strong class="text-xl font-bold md:text-2xl mb-4">
			Vehicle Makers
		</strong>

		<a href="{{ route('hub.utils.vehicles.create') }}" class="py-2 px-4 text-sm border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-sm border inline-flex justify-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2">
			Create maker
	  	</a>
    </div>

    @livewire('hub.utils.vehicles.vehicles-table')
</div>