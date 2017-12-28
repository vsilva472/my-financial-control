( function () {
    angular.module( 'mfc' ).factory( 'onDatabaseError', onDatabaseError );

    onDatabaseError.$inject = [ '$mdToast' ];

    function onDatabaseError ( $mdToast ) {
        return {
            showError : function ( error ) {
                $mdToast.showSimple( 'Erro ao executar a operação.' );
                console.log( error );
            }
        }
    }
} () );