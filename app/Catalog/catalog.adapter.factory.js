( function () {
    angular.module( 'mfc' ).factory( 'CatalogAdapter', CatalogAdapter );

    function CatalogAdapter () {
        return {
            parseSingle : function ( resultSet ) {
                item = {};

                if ( resultSet.rows && resultSet.rows.length === 1 ) {
                    item = resultSet.rows.item( 0 );
                    item.created_at = new Date( item.created_at );
                }

                else {
                    item.created_at = new Date();
                }

                return item;
            },

            parseCollection : function ( collection ) {
                var items = [];
                var total = angular.isArray( collection ) ? 0 : collection.rows.length;

                for ( var i = 0; i < total; i++ ) {

                    var item = collection.rows.item( i );

                    items.push( item );
                }

                return items;
            },

            prepareForDb : function ( item ) {
                var data = angular.copy( item );
                data.created_at = data.created_at.toISOString();
                return data;
            }
        };
    }

} () );