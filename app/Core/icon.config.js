( function () {
    angular.module( 'mfc' ).config( configureIcons );

    configureIcons.$inject = [ '$mdIconProvider' ];

    function configureIcons ( $mdIconProvider ) {
        $mdIconProvider
            .icon( 'add',               'assets/icons/ic_add_black_24px.svg', 24 )
            .icon( 'back',              'assets/icons/ic_arrow_back_black_24px.svg', 24 )
            .icon( 'save',              'assets/icons/ic_done_all_black_24px.svg', 24 )
            .icon( 'clear',             'assets/icons/ic_clear_black_24px.svg', 24 )
            .icon( 'search',            'assets/icons/ic_search_black_24px.svg', 24 )
            .icon( 'remove',            'assets/icons/ic_remove_black_24px.svg', 24 )
            .icon( 'catalog',           'assets/icons/ic_import_contacts_black_24px.svg', 24 )
            .icon( 'date_range',        'assets/icons/ic_date_range_black_24px.svg', 24 )
            .icon( 'delete_forever',    'assets/icons/ic_delete_forever_black_24px.svg', 24 )
            .icon( 'info',    'assets/icons/ic_info_outline_black_24px.svg', 24 );

    }
} () );