( function () {
    angular.module( 'mfc' ).directive( 'fab', Fab );

    Fab.$inject = [ '$location' ];

    function Fab ( $location ) {
        return {
            restrict : 'E',
            template : '<md-button class="md-fab md-fab-bottom-right fab-scale fab-scale-up" aria-label="{{aria}}"><md-icon md-svg-src="{{icon}}"></md-icon></md-button>',
            scope : {
                navigateTo : "@",
                icon : "@",
                aria: "@"
            },
            link : function (scope, element, attr) {
                element.on('click', function () {
                    $location.path(scope.navigateTo);
                });
            }
        }
    }
} () );
