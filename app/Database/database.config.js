( function () {
    angular.module( 'mfc' ).constant( 'DATABASE' , {

        /**
         * The key used in localstorag to be checked to (re)install the database
         * @see init function database.service.js
         */
        lskey : 'mfcinstalled',

        /**
         * The database version
         * @see database.service.js
         */
        version : 1,

        /**
         * The app database name
         * @see database.service.js
         */
        dbname : 'mfc',

        /**
         * The app database description
         * @see database.service.js
         */
        description : 'financial database storage',

        /**
         * The app database size in MB
         * @see database.service.js
         */
        size : 5 * 1024 * 1024, // 5MB

        /**
         * The app database schemas
         * @see database.service.js
         */
        schemas : {
            catalog : "CREATE TABLE IF NOT EXISTS catalog "+
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "+
            "name VARCHAR(30) NOT NULL, " +
            "price DECIMAL(10,2) NOT NULL, " +
            "created_at DATETIME NOT NULL)",

            entries : "CREATE TABLE IF NOT EXISTS entries " +
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
            "name VARCHAR(30) NOT NULL, " +
            "price DECIMAL(10,2) NOT NULL, " +
            "created_at DATETIME NOT NULL, " +
            "operation CHARACTER(1) NOT NULL)"
        },

        /*  Default items per page */
        itemsPerPage : 50,

        /* Initialize app with predefined values */
        seed : true
    });
} () );