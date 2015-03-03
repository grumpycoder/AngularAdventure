(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        ['common', 'config', 'entityManagerFactory', 'model', datacontext]);

    function datacontext(common, config, emFactory, model) {
        var entityNames = model.entityNames;

        var EntityQuery = breeze.EntityQuery;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var logError = getLogFn(serviceId, 'error');
        var logSuccess = getLogFn(serviceId, 'success');
        var manager = emFactory.newManager();
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getProductPartials: getProductPartials,
            getProductById: getProductById
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }

        function getProductPartials() {
            var orderBy = 'name';
            var products;

            return EntityQuery.from('Products')
                .select('productId, name, productNumber, color, standardCost, listPrice, sellStartDate')
                .orderBy(orderBy)
                .toType('Product')
                .using(manager)
                .execute()
                .then(querySucceeded, _queryFailed);

            function querySucceeded(data) {
                products = data.results;
                log('Retrieved [Product Partials] from remote data source', products.length, true);
                //log('products', products, false);
                return products;
            }
        }

        function getProductById(id) {

            return EntityQuery.from('Products')
                .where('productId', '==', id)
                .toType('Product')
                .using(manager)
                .execute()
                .then(querySucceeded, _queryFailed);

            function querySucceeded(data) {
                var entity = data.results[0];
                return entity; 
            }
        }


        function _queryFailed(error) {
            var msg = config.appErrorPrefix + 'Error retrieving data' + error.message;
            logError(msg, error);
            throw error;
        }
    }
})();