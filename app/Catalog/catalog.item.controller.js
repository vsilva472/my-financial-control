( function () {
    angular.module( 'mfc' ).controller( 'CatalogItemController', CatalogItemController );

    CatalogItemController.$inject= [
        '$location',
        'Catalog',
        'DataAdapter',
        'pageTitle',
        'item',
        'onDatabaseError',
        'isEditMode',
        'confirmDialog'
    ];

    function CatalogItemController ( $location, Catalog, DataAdapter, pageTitle, item, onDatabaseError, isEditMode, confirmDialog ) {
        /* jshint validthis: true */
        var self = this;

        self.item           = DataAdapter.parseSingle( item );
        self.pageTitle      = pageTitle;
        self.isEditMode     = isEditMode;

        self.removeItem     = removeItem;
        self.updateOrCreate = updateOrCreate;

        function removeItem ( item ) {
            confirmDialog
                .open( item )
                .then( function () {
                    Catalog.remove( item ).then( function () {
                        $location.path( '/catalog' );
                    } ).catch( onDatabaseError.showError );
                } );
        }

        function updateOrCreate ( item ) {
            Catalog.updateOrCreate( DataAdapter.prepareForDb( item ) ).then( function () {
                $location.path( '/catalog' );
            } ).catch( onDatabaseError.showError );
        }
    }
} () );