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
            console.log( 'creating tables...' );
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
         * Seed tables if DATABASE.seed === true
         *
         * @see DATABASE.seed - database.config.js
         *
         * @return void
         */
        function seed () {
            console.log( 'seeding...' );

            function getRandomPrice() {
                return ( Math.random() * ( 0.99 - 50.99 ) + 50.99 ).toFixed( 2 );
            }

            /* Input list */
            var inputs = [
                { name : 'Barba', price: getRandomPrice() },
                { name : 'Barba Navalhada', price: getRandomPrice() },
                { name : 'Corte à Máquina', price: getRandomPrice() },
                { name : 'Corte à Tesoura', price: getRandomPrice() },
                { name : 'Máquina + Tesoura', price: getRandomPrice() },
                { name : 'Sombrancelha', price: getRandomPrice() },
                { name : 'Shampoo p/ Barba', price: getRandomPrice()}
            ];

            /* Output list */
            var outputs = [
                { name: 'Almoço' , price: getRandomPrice() } ,
                { name: 'Lanche', price: getRandomPrice() },
                { name: 'Jantar com clientes', price: getRandomPrice() },
                { name: 'Cigarro', price: getRandomPrice() },
                { name: 'Sorvete', price: getRandomPrice() },
                { name: 'Aluguel', price: getRandomPrice() },
                { name: 'Reboque', price: getRandomPrice() }
            ];

            /* Today iso string */
            var today = new Date().toISOString();

            /* SQL */
            var sqlCatalog = "INSERT INTO catalog (name, price, created_at) VALUES (?,?,?)";
            var sqlEntries = "INSERT INTO entries (name, price, operation, created_at) VALUES (?,?,?,?)";

            db.transaction( function ( tx ) {
                angular.forEach( inputs, function ( service ) {
                    tx.executeSql( sqlCatalog, [ service.name, service.price, today ], function ( tx, rs ) {},
                        function ( tx, error ) { console.log( 'Erro while seeding catalog table' ); console.log( error ) } );
                } );

                // seed entries today
                for ( var x=0; x<50; x++ ) {

                    /* Random index from outputs (outputs and inputs have same length) */
                    var itemIndex =  Math.floor(Math.random() * outputs.length );

                    // Random entry type
                    var entryType = Math.floor(Math.random() * 5 + 1);

                    // operation type base on entry type
                    var operation = entryType === 5 ? 'o' : 'i';

                    // entry name base on operation
                    var entry = operation === 'i' ? inputs[ itemIndex ] : outputs[ itemIndex ];

                    tx.executeSql( sqlEntries, [ entry.name, entry.price, operation, today ], function ( tx, rs ) {},
                        function ( tx, error ) { console.log( 'Erro while seeding entry table' ); console.log( error ) } );
                }

            } );

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
                if ( DATABASE.seed === true ) seed();

                localStorage.setItem( DATABASE.lskey, '1' );
            }
        }

        init();
    }
} () );