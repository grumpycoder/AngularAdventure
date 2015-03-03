(function () {
    'use strict';
    var controllerId = 'products';
    angular.module('app').controller(controllerId, ['$location', 'common', 'datacontext', products]);

    function products($location, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.gotoProduct = gotoProduct; 
        vm.title = 'Products';
        vm.products = [];

        activate();

        function activate() {
            common.activateController([getProductPartials()], controllerId)
                .then(function () { log('Activated Products View'); });
        }

        function getProductPartials() {
            datacontext.getProductPartials().then(function(data) {
                vm.products = data;
                return vm.products; 
            });
        }

        function gotoProduct(product) {
            if (product && product.productId) {
                $location.path('/product/' + product.productId);
            }
        }
    }
})();