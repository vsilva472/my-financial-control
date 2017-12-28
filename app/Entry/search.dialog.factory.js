( function () {
    angular.module( 'mfc' ).factory( 'searchDialog', searchDialog );

    searchDialog.$inject = [ '$mdDialog' ];

    function searchDialog ( $mdDialog ) {
        return {
            open : function ( ev ) {
                return $mdDialog.show({
                    controller: 'DialogPeriodController',
                    controllerAs: 'dialogCtrl',
                    templateUrl: 'app/Entry/entry.search.dialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: false
                })
            }
        }
    }
} () );