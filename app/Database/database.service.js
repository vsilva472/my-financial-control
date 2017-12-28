( function () {
    angular.module( 'mfc' ).service( 'Database', WebSql );

    WebSql.$inject = [ '$q', 'DATABASE' ];

    function WebSql ( $q, DATABASE ) {
        /* jshint validthis: true */
        var self = this;

        /* database instance */
        var db;

        /* public method to execute queries on WebSql */
        self.doQuery = doQuery;

        /**
         *  Receive a query and apply prepare steatments with values
         *
         *  @param  String  query   The query to be executed
         *  @param  Array   values  The values to be applied on query parameter
         *
         *  @return promise
         */
        function doQuery ( query, values ) {
            var deferred = $q.defer();

            db.transaction( function ( tx ) {
                tx.executeSql( query, values, function ( tx, rs ) {
                    deferred.resolve( rs );
                }, function ( tx, error ) {
                    deferred.reject( error );
                } )
            } );

            return deferred.promise;
        }


        /**
         * Create the app tables
         *
         * @see DATABASE.schemas - database.config.js
         * @see init function for usage
         *
         * @return void
         */
        function createTables () {
            console.log( 'Creating tables...' );
            for ( var i in DATABASE.schemas ) {
                doQuery( DATABASE.schemas[ i ], [] );
            }
        }

        /**
         * Drop the app tables
         *
         * @see DATABASE.schemas - database.config.js
         * @see init function for usage
         *
         * @return void
         */
        function dropTables () {
            console.log( 'dropping tables...' );
            for ( var table in DATABASE.schemas ) {
                doQuery( "DROP TABLE IF EXISTS " + table, []);
            }
        }

        /**
         * Pseudo service constructor
         */
        function init () {
            if( typeof( openDatabase ) == "undefined" ) {
                alert( "Seu dispositivo não tem suporte WebSQL.\nAcesse com o Chrome por exemplo." );
                throw  "Seu dispositivo não tem suporte WebSQL.";
            }

            db = openDatabase( DATABASE.dbname, DATABASE.version, DATABASE.description, DATABASE.size );

            if ( ! localStorage.getItem( DATABASE.lskey ) ) {
                dropTables();
                createTables();
                localStorage.setItem( DATABASE.lskey, '1' );
            }
        }

        init();
    }
} () );