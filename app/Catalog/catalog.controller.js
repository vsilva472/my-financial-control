( function () {
    angular.module( 'mfc' ).controller( 'CatalogController', CatalogController );

    CatalogController.$inject= [ 'DataAdapter', 'pageTitle', 'items' ];

    function CatalogController ( DataAdapter, pageTitle, items ) {
        /* jshint validthis: true */
        var self = this;

        self.items      = DataAdapter.parseCollection( items );
        self.pageTitle  = pageTitle;
    }
} () );