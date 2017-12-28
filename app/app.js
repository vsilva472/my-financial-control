( function () {
    angular.module( 'mfc', [
        'ngMaterial',
        'ngRoute',
        'ngSanitize',
        'ngMessages'
    ] )
        .run( [ '$templateRequest', function( $templateRequest ) {

            FastClick.attach(document.body);

            var urls = [
                'assets/icons/ic_add_black_24px.svg',
                'assets/icons/ic_arrow_back_black_24px.svg',
                'assets/icons/ic_clear_black_24px.svg',
                'assets/icons/ic_date_range_black_24px.svg',
                'assets/icons/ic_delete_forever_black_24px.svg',
                'assets/icons/ic_import_contacts_black_24px.svg',
                'assets/icons/ic_remove_black_24px.svg',
                'assets/icons/ic_search_black_24px.svg',
                'assets/icons/ic_done_all_black_24px.svg',
                'assets/icons/ic_info_outline_black_24px.svg'
            ];

            angular.forEach( urls, function( url ) { $templateRequest( url ); });

        }]
    );
} () );