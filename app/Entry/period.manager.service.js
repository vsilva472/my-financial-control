/**
 *  This service is used like a storage mechanism
 *  Where store start date obj and final date obj
 *  To bu used in queries for entries where user navigate from
 *  home to catalog and back to home..
 *
 *  Default period is current Date
 *
 *  @see EntryController for usage
 */
( function () {
    angular.module( 'mfc' ).service( 'PeriodManager', PeriodManager );

    function PeriodManager () {
        // Default Period Object
        var p = { start : new Date(), end : new Date };

        /**
         * Set period start and final
         *
         * @return void
         */
        this.set = function ( start, end ) {
            p.start = start;
            p.end = end;
        };

        /**
         * Return the period computed
         */
        this.get = function () {
            return p;
        };
    }

} () );