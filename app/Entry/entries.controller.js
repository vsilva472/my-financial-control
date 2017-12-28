( function () {
    angular.module( 'mfc' ).controller( 'EntriesController', EntriesController );

    EntriesController.$inject = [
        '$rootScope',
        '$filter',
        '$locale',
        'Entry',
        'DataAdapter',
        'onDatabaseError',
        'DATABASE',
        'searchDialog',
        'PeriodManager'
    ];

    function EntriesController ( $rootScope, $filter, $locale, Entry, DataAdapter, onDatabaseError, DATABASE, searchDialog, PeriodManager ) {
        /* jshint validthis: true */
        var self = this;

        self.items      = [];
        self.inputs     = 0.00;
        self.outputs    = 0.00;
        self.currency   = $locale.NUMBER_FORMATS.CURRENCY_SYM || '$';
        self.total      = function () { return ( self.inputs - self.outputs ); };
        self.pageTitle  = "Controle Financeiro";

        /* Pagination properties */
        self.isPaginationAllowed = true;
        self.pageSize = 0;

        /* Period Filter */
        self.periodStart    = null;
        self.periodEnd      = null;

        /* display count label */
        self.msg = '';

        self.openFilterDialog = openFilterDialog;


        /**
         * Success callback of query paginate
         *
         * @param   WebSqlObject    rs  Result set of query
         * @return void;
         */
        function onQuerySuccess ( rs ) {
            var data = DataAdapter.parseCollection( rs );

            if ( data.length !== 0 ) {

                data.forEach( function ( item ) {
                    self.items.push( item  );
                } );

                self.pageSize += DATABASE.itemsPerPage;
                self.isPaginationAllowed = true;

                return;
            }

            self.isPaginationAllowed = false;
        }

        /**
         * Perform a query on Database with date params
         *
         * @private function
         */
        function queryDateByRange () {
            console.log( 'queryDateByRange' );
            Entry.findByDateRange(
                DataAdapter.parsePeriod.start( self.periodStart ),
                DataAdapter.parsePeriod.end( self.periodEnd ),
                self.pageSize
            ).then( onQuerySuccess ).catch( onDatabaseError.showError );
        }

        /**
         * @private function
         */
        function resetQueryParams ( period ) {
            // reset query params
            self.periodStart = period.start;
            self.periodEnd = period.end;
            self.pageSize = 0;
            self.isPaginationAllowed = true;
            self.items = [];
        }

        /**
         * @private function
         * Success callback to search dialog
         */
        function onSelectPeriod ( period ) {
            PeriodManager.set( period.start,  period.end );
            resetQueryParams( period );
            queryDateByRange();
            setPainelValues();
        }

        /**
         * Open a custom dialog to user select a date range
         *
         * @see search.dialog.factory.js
         */
        function openFilterDialog ( ev ) {
            searchDialog.open( ev )
                .then( onSelectPeriod, function () {} );
        }

        /**
         * @private function set input value based on date rage
         * @see setPainelValues
         *
         * @return promise
         */
        function getInputValues () {
            return Entry.getPeriodInputAmount(
                DataAdapter.parsePeriod.start( self.periodStart ),
                DataAdapter.parsePeriod.end( self.periodEnd )
            )
        }

        /**
         * @private function set output value based on date rage
         * @see setPainelValues
         *
         * @return void
         */
        function getOutputValues () {
            return Entry.getPeriodOutputAmount(
                DataAdapter.parsePeriod.start( self.periodStart ),
                DataAdapter.parsePeriod.end( self.periodEnd )
            );
        }

        /**
         * @private function
         * Set view values for output and input on panel
         *
         * @return void
         */
        function setPainelValues () {
            var valInput;

            getInputValues().then( function ( input ) {
                valInput = DataAdapter.parseProperty( input, 'total' );
                return getOutputValues();
            } ).then( function ( output ) {
                self.outputs = DataAdapter.parseProperty( output, 'total' );
                self.inputs = valInput;
            } );

            setAccumulatedLabel();
        }

        /*
         * Receive a signal from scrollNotifier directive
         * Indicating that scroll reach the bottom of container
         * Then starts paginate results
         */
        $rootScope.$on( 'scroll.bottom', function () {
            if ( self.isPaginationAllowed ) {
                self.isPaginationAllowed = false;
                queryDateByRange();
            }
        } );

        /**
         * @private function
         *
         * Formats the painel sum label
         */
        function setAccumulatedLabel () {
            var start = moment( self.periodStart );
            var end = moment( self.periodEnd );
            var startLocalized = $filter( 'date' )( self.periodStart, 'shortDate' );
            var endLocalized = $filter( 'date' )( self.periodEnd, 'shortDate' );

            if ( start.format( 'YYYYMMDD' ) === end.format( 'YYYYMMDD' ) ) {
                // Today
                if ( moment().format( 'YYYYMMDD' ) === start.format( 'YYYYMMDD' ) ) self.msg = "Acumulado Hoje";
                else self.msg = 'Em ' + startLocalized;
            }

            else {
                self.msg = "De ";
                if ( self.periodStart > self.periodEnd ) self.msg += endLocalized + ' a ' + startLocalized;
                else self.msg += startLocalized + ' à ' + endLocalized;
            }
        }

        // Controller constructor
        function init () {
            var period = PeriodManager.get();
            self.periodStart = period.start;
            self.periodEnd = period.end;

            queryDateByRange();
            setPainelValues();
        }

        init();
    }

} () );