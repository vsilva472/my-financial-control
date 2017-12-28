( function () {
    angular.module( 'mfc' ).controller( 'DialogPeriodController', DialogPeriodController );

    DialogPeriodController.$inject = [ '$mdDialog', 'PeriodManager' ];

    function DialogPeriodController ( $mdDialog,PeriodManager ) {

        /* jshind validthis: true */
        var self = this;

        /* dates to filter */
        self.period = {};

        self.cancel = function() {
            $mdDialog.cancel();
        };

        self.onSelectPeriod = function( period ) {
            if ( !period.start || !period.end ) return;

            if ( period.start > period.end ) {
                var start = period.start;
                period.start = period.end;
                period.end = start;
            }

            $mdDialog.hide( period );
        };

        function init () {
            var pm = PeriodManager.get();
            self.period.start = pm.start;
            self.period.end = pm.end;
        }

        init();
    }
} () );