<div class="flex-col space-y-4">
	<div>
		<strong class="text-xl font-bold md:text-2xl mb-4">
			Image scrapper
		</strong>

		<p class="mb-4">This page can be use to scrap product image from AutoDoc.</p>

		<div class="overflow-hidden shadow sm:rounded-md">
			<div class="flex-col px-4 py-5 space-y-4 bg-white sm:p-6">
				<div class="mb-4">
					<p>How to use?</p>
					<ol class="list-disc list-inside">
						<li>- Get the product id from the url in AutoDoc.</li>
						<li>- Paste in the following input.</li>
						<li>- Click <span class="font-medium">"Get images"</span></li>
						<li>- <span class="font-medium">"Download all images"</span> will download all the images, including 360 images of the given product as a zip file.</li>
						<li>- <span class="font-medium text-red-500">Not all the products are suported</span></li>
					</ol>
				</div>

					<form class="flex justify-between items-center" method="post" action="/hub/download">
						{{ csrf_field() }}
						<div class="flex justify-start items-end">
							<div>
								<label for="" class="text-md font-semibold">AutoDoc product id:</label>
								<input name="product_id" id="input-product-id" type="text" class="form-input block w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed" required>
							</div>
							<button type="button" id="btn-get-images" class="py-2 px-4 text-sm border-transparent ml-4 bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-sm border inline-flex justify-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2">
								Get images
							</button>
						</div>

						<button class="py-2 px-4 text-sm border-transparent ml-4 bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-sm border inline-flex justify-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2">
							Download all images
						</button>
					</form>

				<div id="images" class="grid grid-cols-6 gap-4"></div>
			</div>
		</div>
	</div>
</div>

<script>
	let btnGetImages = document.getElementById('btn-get-images');
	btnGetImages.addEventListener('click', function() {

		document.getElementById('images').innerHTML = '';

		let productId = document.getElementById('input-product-id').value;

		if( ! productId || isNaN(productId)){
			return alert('Please enter a valid product id');
		}

		let main = `<a href="https://media.autodoc.de/360_photos/${productId}/h-preview.jpg" download><img src="https://media.autodoc.de/360_photos/${productId}/h-preview.jpg"></a>`
		let others = '';

		for (let index = 1; index < 8; index++) {
				others += `<img src="https://cdn.autodoc.de/thumb?id=${productId}&n=${index}">`;		
		}

		document.getElementById('images').innerHTML = main + others;

		console.log('Clicked', productId);
	});
</script>
