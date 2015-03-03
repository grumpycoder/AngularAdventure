(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'model';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    angular.module('app').factory(serviceId, [model]);

    function model() {
        var entityNames = {
            product: 'Product',
            customer: 'Customer',
            order: 'SalesOrder',
            models: 'ProductModel',
            description: 'ProductDescription',
            category: 'ProductCategory'
        };

        var service = {
            configureMetadataStore: configureMetadataStore, 
            entityNames: entityNames
        };

        return service;

        function configureMetadataStore(metadataStore) {
            registerCustomer(metadataStore);
        }

        function registerCustomer(metadataStore) {
            metadataStore.registerEntityTypeCtor('Customer', Customer);

            function Customer() {
                this.isPartial = false; 
            }

            Object.defineProperty(Customer.prototype, 'fullName', {
                get: function() {
                    var fn = this.firstName;
                    var ln = this.lastName;
                    return ln ? fn + ' ' + ln : fn;
                }
            });

        }

    }

})();