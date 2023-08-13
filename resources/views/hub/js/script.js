$.when( $.ready ).then(function() {

    $(document).on('scroll', function() {
        $('#tax_class').closest('.grid').hide();
        $('#identifiers, #urls, #variants').hide();

        $('a[href="#urls"], a[href="#identifiers"], a[href="#variants"]').hide();
    })

});