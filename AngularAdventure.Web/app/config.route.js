(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    controller: 'dashboard',
                    controllerAs: 'vm',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    controller: 'admin',
                    controllerAs: 'vm',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }, {
                url: '/products',
                config: {
                    title: 'products',
                    controller: 'products',
                    controllerAs: 'vm', 
                    templateUrl: 'app/product/products.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-bicycle"></i> Products'
                    }
                }
            }
            , {
                url: '/product/:id',
                config: {
                    title: 'productdetail',
                    controller: 'productdetail',
                    controllerAs: 'vm',
                    templateUrl: 'app/product/productdetail.html',
                    settings: {}
                }
            }
        ];
    }
})();