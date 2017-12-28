( function () {
    angular.module( 'mfc' ).controller( 'EntryController', EntryController );

    EntryController.$inject = [
        '$timeout',
        '$location',
        'Entry',
        'Catalog',
        'DataAdapter',
        'pageTitle',
        'item',
        'isEditMode',
        'onDatabaseError',
        'confirmDialog'
    ];

    function EntryController ( $timeout, $location, Entry, Catalog, DataAdapter, pageTitle, item, isEditMode, onDatabaseError, confirmDialog ) {

        /* jshint validthis:true */
        var self = this;

        self.item               = DataAdapter.parseSingle( item );
        self.pageTitle          = pageTitle;
        self.isEditMode         = isEditMode;

        self.updateOrCreate     = updateOrCreate;
        self.removeItem         = removeItem;
        self.onSelectItem       = onSelectItem;
        self.loadCatalog        = loadCatalog;

        /**
         * Open a confirm dialog before execute the action of remove item from database
         *
         * @param   object  item    The item to be removed
         * @param   int     index   The index of item on de list of items
         *
         * @return void
         *
         */
        function removeItem ( item ) {
            confirmDialog.open( item )
                .then( function () {
                    Entry.remove( item ).then( function () {
                        $location.path( '/' );
                    } ).catch( onDatabaseError.showError );
                } );
        }

        /**
         * Set values of the item choosed by user in form
         *
         * @param   object  item    The item choosed
         *
         * @return void
         */
        function onSelectItem( item ) {
            if( item && item.name) {
                self.item.name = angular.copy( item.name );
                self.item.price = angular.copy( item.price );
                self.item.operation = 'i';
                self.search = false;

                $timeout(function () {
                    delete self.selectedItem;
                }, 100);
            }
        }

        function loadCatalog () {
            if ( self.catalog ) return self.catalog;

            Catalog.all().then( function ( rs ) {
                if ( rs.rows.length )
                    self.catalog = DataAdapter.parseCollection( rs );
            } );
        }

        /**
         * Update o create a Entry in database
         *
         * @param   object  item   The item to be updated/created
         *
         * @return void
         */
        function updateOrCreate ( item ) {
            Entry.updateOrCreate( DataAdapter.prepareForDb( item ) ).then( function () {
                $location.path( '/' );
            } ).catch( onDatabaseError.showError );
        }
    }

} () );