(function () {
    'use strict';
    var controllerId = 'productdetail';
    angular.module('app').controller(controllerId,
        ['$routeParams', 'common','datacontext', productdetail]);

    function productdetail($routeParams, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Product Detail';

        activate();

        function activate() {
            common.activateController([getRequestedProduct()], controllerId)
                .then(function () { log('Activated Product Detail View'); });
        }

        function getRequestedProduct() {
            var val = $routeParams.id;
            if (val) {
                return datacontext.getProductById(val).then(function (data) {
                    vm.product = data;
                    console.log(vm.product);
                });
            }
            
        }
    }
})();