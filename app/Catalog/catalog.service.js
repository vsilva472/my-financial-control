( function () {
    angular.module( 'mfc' ).service( 'Catalog', Catalog );

    Catalog.$inject = [ 'Database' ];

    function Catalog ( database ) {

        /* jshint validthis: true*/
        var self = this;

        /* Databse resource */
        self.DB                     = database;
        self.all                    = all;
        self.create                 = create;
        self.update                 = update;
        self.remove                 = remove;
        self.findByID               = findByID;
        self.updateOrCreate         = updateOrCreate;

        /**
         * Retrive all items stored
         *
         * @return  promise;
         */
        function all () {
            var query = "SELECT id, name, price, created_at FROM catalog";
            return self.DB.doQuery( query, [] );
        }

        /**
         * @param   OBJECT  item    the item representation
         *
         * Ex:
         * {
         *      name : 'My item name',
         *      price : 1.09
         * }
         *
         * @return  promise;
         */
        function create ( item ) {
            var query = "INSERT INTO catalog (name, price, created_at) VALUES (?,?,?)";
            return self.DB.doQuery( query, [ item.name, item.price, item.created_at ] );
        }

        /**
         * Retrive a resource by a given id
         *
         * @param   INT id    the id of item to find in Database
         *
         * @return  promise;
         */
        function findByID ( id ) {
            var query = "SELECT id, name, price, created_at FROM catalog WHERE id = ?";
            return self.DB.doQuery( query, [ id ] );
        }

        /**
         * update a given resource
         *
         * @param   Object  item    the resource to be updated
         *
         * @return  promise;
         */
        function update ( item ) {
            var query = "UPDATE catalog  SET name = ?, price = ? WHERE id = ?";
            return self.DB.doQuery( query, [ item.name, item.price, item.id ] );
        }

        /**
         * update or create a given resource
         *
         * @param   Object  item    the resource to be updated or created
         *
         * @return  promise;
         */
        function updateOrCreate ( item ) {
            if ( item.id ) return update( item );
            return self.create( item );
        }

        /**
         * remove from store a given resource
         *
         * @param   Object  item    the resource to be removed
         *
         * @return  promise;
         */
        function remove ( item ) {
            var query = "DELETE FROM catalog WHERE id = ?";
            return self.DB.doQuery( query, [ item.id ] );
        }
    }

} () );




