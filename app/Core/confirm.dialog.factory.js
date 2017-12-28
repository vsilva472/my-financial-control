( function () {
    angular.module( 'mfc' ).factory( 'confirmDialog', confirmDialog );

    confirmDialog.$inject = [ '$mdDialog', '$filter' ];

    function confirmDialog ( $mdDialog, $filter ) {
        return {
            open : function ( item ) {
                var text = item.name + ' ' + $filter( 'currency' )( item.price ) + '?';

                var confirm = $mdDialog.confirm()
                    .parent( angular.element( document.body ) )
                    .title( 'Remover' )
                    .textContent( text )
                    .ariaLabel( 'Confirmar Ação' )
                    .ok( 'Sim' )
                    .cancel( 'Cancelar' );

                return $mdDialog.show( confirm );
            }
        };
    }
} () );