( function () {
    angular.module( 'mfc' ).controller( 'EntryController', EntryController );

    EntryController.$inject = [
        '$timeout',
        '$location',
        'Entry',
        'DataAdapter',
        'pageTitle',
        'item',
        'catalog',
        'isEditMode',
        'onDatabaseError',
        'confirmDialog'
    ];

    function EntryController ( $timeout, $location, Entry, DataAdapter, pageTitle, item, catalog, isEditMode, onDatabaseError, confirmDialog ) {

        /* jshint validthis:true */
        var self = this;

        self.item               = DataAdapter.parseSingle( item );
        self.catalog            = DataAdapter.parseCollection( catalog );
        self.pageTitle          = pageTitle;
        self.isEditMode         = isEditMode;

        self.querySearch        = querySearch;
        self.updateOrCreate     = updateOrCreate;
        self.selectedItemChange = selectedItemChange;
        self.removeItem         = removeItem;

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
         * Search item by item name
         *
         * @param   String  query   The query to be searched on item.name
         *
         * @return  object  the item filtered
         */
        function querySearch ( query ) {
            return query ? self.catalog.filter( createFilterFor( query ) ) : self.catalog;
        }

        /**
         * Set values of the item choosed by user in form
         *
         * @param   object  item    The item choosed
         *
         * @return void
         */
        function selectedItemChange( item ) {
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

        /**
         * Create filter function for a query string
         *
         * @param   String  query   The query to search on list
         */
        function createFilterFor( query ) {
            var lowercaseQuery = angular.lowercase( query );
            return function filterFn( catalogItem ) {
                return ( catalogItem.name.toLowerCase().indexOf( lowercaseQuery ) !== -1 );
            };
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