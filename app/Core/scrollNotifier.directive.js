/**
 * This directive is used to help identificate when scroll of an element reach the bottom
 * then broadcast a event to current page catch and start do a pagination
 */

( function () {
    angular.module( 'mfc' ).directive( 'scrollNotifier', scrollNotifier );

    scrollNotifier.$inject = [ '$rootScope' ];

    function scrollNotifier ( $rootScope ) {
        return {
            link : function ( scope, element, attr ) {
                var lastScroll = 0;

                element.bind( 'scroll', function (e) {
                    var maxScroll = this.scrollHeight - this.clientHeight;

                    // if direction is down
                    if ( this.scrollTop  > lastScroll ) {

                        // if scrolled amount is enought to notificate
                        if ( maxScroll - this.scrollTop === 0 ) {
                            $rootScope.$broadcast( 'scroll.bottom' );
                        }
                    }

                    lastScroll = this.scrollTop;
                } );
            }
        };
    }
} () );