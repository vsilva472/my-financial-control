( function () {
    angular.module( 'mfc' ).config( function( $routeProvider, $locationProvider ) {
        $routeProvider
            .when( '/', {
                templateUrl: 'app/Entry/entrylist.tmpl.html',
                controller: 'EntriesController',
                controllerAs: 'entriesCtrl',
                resolve: {
                    items : [ 'Entry', 'DataAdapter', function ( Entry, DataAdapter ) {
                        return Entry
                            .findByDateRange(
                                DataAdapter.parsePeriod.start( new Date() ),
                                DataAdapter.parsePeriod.end( new Date() ),
                                0
                            );
                    }],

                    inputs : [ 'Entry', 'DataAdapter', function ( Entry, DataAdapter ) {
                        return Entry
                            .getPeriodInputAmount(
                                DataAdapter.parsePeriod.start( new Date() ),
                                DataAdapter.parsePeriod.end( new Date() )
                            );
                    }],

                    outputs : [ 'Entry', 'DataAdapter', function ( Entry, DataAdapter ) {
                        return Entry.getPeriodOutputAmount(
                            DataAdapter.parsePeriod.start( new Date() ),
                            DataAdapter.parsePeriod.end( new Date() )
                        );
                    }]
                }
            })
            .when( '/entry/add', {
                templateUrl: 'app/Entry/entry.tmpl.html',
                controller: 'EntryController',
                controllerAs: 'ctrl',
                resolve: {
                    item : function () {
                        return null;
                    },

                    pageTitle : function () {
                        return "Nova Entrada";
                    },

                    isEditMode : function () {
                        return false;
                    }
                }
            })
            .when( '/entry/edit/:id', {
                templateUrl: 'app/Entry/entry.tmpl.html',
                controller: 'EntryController',
                controllerAs: 'ctrl',
                resolve: {
                    item : [ '$route', 'Entry', function ( $route, Entry ) {
                        return Entry.findByID( $route.current.params.id );
                    }],

                    pageTitle : function () {
                        return "Editar Entrada";
                    },

                    isEditMode : function () {
                        return true;
                    }
                }
            });
    });
} () );