( function () {
    angular.module( 'mfc' ).service( 'Entry', Entry );

    Entry.$inject = [ 'Database', 'DATABASE' ];

    function Entry ( database, DATABASE ) {

        /* jshint validthis: true*/
        var self = this;

        /* Databse resource */
        self.DB                     = database;
        self.create                 = create;
        self.update                 = update;
        self.remove                 = remove;
        self.findByID               = findByID;
        self.updateOrCreate         = updateOrCreate;
        self.findByDateRange        = findByDateRange;
        self.getPeriodInputAmount   = getPeriodInputAmount;
        self.getPeriodOutputAmount  = getPeriodOutputAmount;

        /**
         * @param   OBJECT  item    the item representation
         *
         * Note: created_at parameter must be a javascript ISO format
         * Note: operation can be 'i' = input or 'o' output
         *
         * Ex:
         * {
         *      name : 'My entry',
         *      price : 1.09,
         *      created_at : '2017-12-25T22:02:06.843Z',
         *      operation : 'i'
         * }
         *
         * @return  promise;
         */
        function create ( item ) {
            var query = "INSERT INTO entries (name, price, created_at, operation) VALUES (?,?,?,?)";
            return self.DB.doQuery( query, [ item.name, item.price, item.created_at, item.operation ] );
        }

        /**
         * @param   INT id    the id of item to find in Database
         *
         * @return  promise;
         */
        function findByID ( id ) {
            var query = "SELECT id, name, price, operation, created_at FROM entries WHERE id = ?";
            return self.DB.doQuery( query, [ id ] );
        }

        /**
         * Retrieve a list of entries by a date range
         *
         * @param   String  date_start    the start period in YYYY-MM-DDT00:00:00.000
         * @param   date_end    date_start    the end period in YYYY-MM-DDT23:59:59.999 format
         * @param   INT    page    the page to paginate the query
         *
         * @return  promise;
         */
        function findByDateRange ( date_start, date_end, page ) {
            var query = "SELECT id, name, price, operation, created_at FROM entries WHERE created_at BETWEEN ? AND ? ORDER BY created_at ASC LIMIT @page,@offset";
            return self.DB.doQuery( query.replace( '@page', page ).replace( '@offset', DATABASE.itemsPerPage ), [ date_start, date_end ] );
        }

        /**
         * update a given resource
         *
         * @param   Object  item    the resource to be updated
         *
         * @return  promise;
         */
        function update ( item ) {
            var query = "UPDATE entries SET name = ?, price = ?, operation = ?, created_at = ? WHERE id = ?";
            return self.DB.doQuery( query, [ item.name, item.price, item.operation, item.created_at, item.id ] );
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
         * retrieve computed revenue by a date range for a specific operation type
         *
         *  @param  String  period_start    The date in iso format YYYY-MM-DDT00:00:00.000
         *  @param  String  period_end    The date in iso format YYYY-MM-DDT23:59:59.999
         *  @param  Char    operation   The code of operation type
         *
         * Note: operation can be "i" = INPUT or "o" = OUTPUT
         *
         *  @return promise
         */
        function getOperationAmount ( period_start, period_end, operation ) {
            var query = "SELECT SUM(price) as total FROM entries WHERE created_at BETWEEN ? AND ? AND operation = ?";
            return  self.DB.doQuery( query, [ period_start, period_end, operation ] );
        }

        /**
         * retrieve computed value of INPUT operation by a date range
         *
         *  @param  String  period_start    The date in iso format YYYY-MM-DDT00:00:00.000
         *  @param  String  period_end    The date in iso format YYYY-MM-DDT23:59:59.999
         *
         *  @return promise
         */
        function getPeriodInputAmount( period_start, period_end ) {
            return getOperationAmount ( period_start, period_end, 'i' );
        }

        /**
         * retrieve computed value of OUTPUT operation by a date range
         *
         *  @param  String  period_start    The date in iso format YYYY-MM-DDT00:00:00.000
         *  @param  String  period_end  The date in iso format YYYY-MM-DDT23:59:59.999
         *
         *  @return promise
         */
        function getPeriodOutputAmount( period_start, period_end ) {
            return getOperationAmount ( period_start, period_end, 'o' );
        }


        /**
         * remove from store a given resource
         *
         * @param   Object  item    the resource to be removed
         *
         * @return  promise;
         */
        function remove ( item ) {
            var query = "DELETE FROM entries WHERE id = ?";
            return self.DB.doQuery( query, [ item.id ] );
        }
    }

} () );




