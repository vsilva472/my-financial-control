( function () {
    angular.module( 'mfc' ).config( function( $routeProvider, $locationProvider ) {
        $routeProvider
            .when( '/catalog', {
                templateUrl: 'app/Catalog/catalog.tmpl.html',
                controller: 'CatalogController',
                controllerAs: 'catalog',
                resolve: {
                    items : [ 'Catalog', function ( Catalog ) {
                        return Catalog.all();
                    }],

                    pageTitle : function () {
                        return 'Catálogo';
                    }
                }
            })

            .when( '/catalog/add', {
                templateUrl: 'app/Catalog/catalog.item.tmpl.html',
                controller: 'CatalogItemController',
                controllerAs: 'ctrl',
                resolve: {
                    item : function () {
                        return [{}];
                    },

                    pageTitle : function () {
                        return 'Novo Item';
                    },

                    isEditMode : function () {
                        return false;
                    }
                }
            })

            .when( '/catalog/edit/:id', {
                templateUrl: 'app/Catalog/catalog.item.tmpl.html',
                controller: 'CatalogItemController',
                controllerAs: 'ctrl',
                resolve: {
                    item : [ '$route', 'Catalog', function ( $route, Catalog ) {
                        return Catalog.findByID( $route.current.params.id );
                    }],

                    pageTitle : function () {
                        return 'Editar Item';
                    },

                    isEditMode : function () {
                        return true;
                    }
                }
            });
    });
} () );