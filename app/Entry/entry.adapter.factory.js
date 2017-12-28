( function () {
    angular.module( 'mfc' ).factory( 'EntryAdapter', EntryAdapter );

    function EntryAdapter () {
        return {
            parseSingle : function ( resultSet ) {
                var item = {};

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

                for ( var i = 0; i < collection.rows.length; i++ ) {

                    var item = collection.rows.item( i );
                    item.created_at = new Date( item.created_at );

                    items.push( item );
                }

                return items;
            },

            parsePeriod : {
                start : function ( dateObj ) {
                    return moment( dateObj ).format( 'YYYY-MM-DDT00:00:00.000' );
                },

                end : function ( dateObj ) {
                    return moment( dateObj ).format( 'YYYY-MM-DDT23:59:59.999' );
                }
            },

            prepareForDb : function ( item ) {
                var data = angular.copy( item );
                data.created_at = data.created_at.toISOString();
                return data;
            },

            parseProperty : function ( rs, prop ) {
                var value = null;

                if ( rs.rows.length ) {
                    value = rs.rows.item( 0 )[ prop ];
                }

                return value;
            }
        };
    }

} () );