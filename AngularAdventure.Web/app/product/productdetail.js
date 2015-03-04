(function () {
    'use strict';

    var controllerId = 'productdetail';

    angular.module('app').controller(controllerId,
        ['$location', '$routeParams', '$scope', '$window', 'bootstrap.dialog',
            'common', 'config', 'datacontext', productdetail]);

    function productdetail($location, $routeParams, $scope, $window, bsDialog,
            common, config, datacontext) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var logError = getLogFn(controllerId, 'error');
        var logSuccess = getLogFn(controllerId, 'success');

        // Bindable properties and functions are placed on vm.
        vm.cancel = cancel;
        vm.categories = [];
        vm.deleteProduct = deleteProduct; 
        vm.goBack = goBack;
        vm.hasChanges = false;
        vm.isSaving = false;
        vm.models = [];
        vm.save = save;
        vm.product = undefined;
        vm.productIdParameter = $routeParams.id;

        // vm.canSave Property
        Object.defineProperty(vm, 'canSave', {
            get: canSave
        });

        function canSave() { return vm.hasChanges && !vm.isSaving; }

        activate();

        function activate() {
            onDestroy();
            onHasChanges();
            initLookups();
            common.activateController([getRequestedProduct()], controllerId);
        }

        function initLookups() {
            var lookups = datacontext.lookupCachedData;
            log(datacontext.lookupCachedData);
            vm.categories = lookups.categories;
            vm.models = lookups.models;
            vm.descriptions = lookups.descriptions; 
        }

        function cancel() {
            datacontext.cancel();
        }

        function deleteProduct() {
            return bsDialog.deleteDialog('Product')
             .then(confirmDelete);

            function confirmDelete() {
                datacontext.markDeleted(vm.product);
                vm.save().then(success, failed);

                function success() {
                    gotoProducts();
                }

                function failed(error) {
                    cancel(); // Makes the entity available to edit again
                }
            }
        }

        function gotoProducts() {
            $location.path('/products');
        }

        function getRequestedProduct() {
            var val = $routeParams.id;

            return datacontext.getProductById(val)
                .then(function (data) {
                    vm.product = data;
            }, function (error) {
                    logError('Unable to get product ' + val);
                });
        }

        function goBack() { $window.history.back(); }

        function onDestroy() {
            $scope.$on('$destroy', function () {
                datacontext.cancel();
            });
        }

        function onHasChanges() {
            $scope.$on(config.events.hasChangesChanged,
                function (event, data) {
                    vm.hasChanges = data.hasChanges;
                });
        }

        function save() {
            if (!canSave()) { return $q.when(null); } // Must return a promise

            vm.isSaving = true;
            return datacontext.save()
                .then(function (saveResult) {
                    vm.isSaving = false;
                }, function (error) {
                    vm.isSaving = false;
                });
        }

    }
})();
