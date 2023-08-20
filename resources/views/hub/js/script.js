$.when($.ready).then(function () {

	$(document).on('scroll', function () {
		$('#tax_class').closest('.grid').hide();
		$('#identifiers, #urls, #variants').hide();

		$('a[href="#urls"], a[href="#identifiers"], a[href="#variants"]').hide();
	});

	addStorefrontLink();
});

function addStorefrontLink(){
	let lastDiv = $('header > div').last();
	lastDiv.addClass('flex justify-between items-center');

	lastDiv.prepend(`<a href="/" target="_blank" class="text-sm mx-4 text-gray-500 font-medium inline-flex">
    <svg class="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    <span class="ml-1">Visit Storefront</span>
	</a>`);
}