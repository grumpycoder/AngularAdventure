(function () {
	'use strict';

	var serviceId = 'datacontext';
	angular.module('app').factory(serviceId,
		['common', 'config', 'entityManagerFactory', 'model', datacontext]);

	function datacontext(common, config, emFactory, model) {
		var entityNames = model.entityNames;
		var EntityQuery = breeze.EntityQuery;
		var events = config.events;
		var getLogFn = common.logger.getLogFn;
		var log = getLogFn(serviceId);
		var logError = getLogFn(serviceId, 'error');
		var logSuccess = getLogFn(serviceId, 'success');
		var manager = emFactory.newManager();
		var primePromise;
		var $q = common.$q;
		var lookupCachedData = {};

		var service = {
			cancel: cancel,
			prime: prime,
			save: save,
			getProductPartials: getProductPartials,
			getProductById: getProductById,
			lookupCachedData: lookupCachedData
		};

		init();

		return service;

		function init() {
			setupEventForHasChangesChanged();
		}

		function cancel() {
			manager.rejectChanges();
			logSuccess('Canceled changes', null, true);
		}

		function getProductById(id) {
			return EntityQuery.from('Products')
			   .where('productId', '==', id)
			   .toType('Product')
			   .using(manager)
			   .execute()
			   .then(success, _queryFailed);

			function success(data) {
				var entity = data.results[0];
				logSuccess('Retrieved [Product] id:' + entity.productId + ' from remote.', null, true);
				return entity;
			}

		}

		function getProductPartials() {
			var order = 'name';
			var products;

			return EntityQuery.from('Products')
				.select('productId, name, productNumber, color, standardCost, listPrice, sellStartDate')
				.orderBy(order)
				.using(manager)
				.execute()
				.then(success, _queryFailed);

			function success(data) {
				products = data.results;
				log('Retrieved [Product Partials] from remote data source', products.length, true);
				return products;
			}
		}

		function prime() {
			if (primePromise) return primePromise;

			primePromise = $q.all([getLookups()])
				.then(success);
			return primePromise;

			function success() {
				setLookups();
				log('Primed the data');
			}
		}

		function setLookups() {
			service.lookupCachedData = {
				categories: _getAllLocal(entityNames.category, 'name'),
				models: _getAllLocal(entityNames.model, 'name'),
				descriptions: _getAllLocal(entityNames.description, 'description')
			};
		}

		function getLookups() {
			return EntityQuery.from('Lookups')
				.using(manager).execute()
				.then(querySucceeded, _queryFailed);

			function querySucceeded(data) {
				log('Retrieved [Lookups]', data, true);
				return true;
			}
		}

		function _getAllLocal(resource, ordering, predicate) {
			return EntityQuery.from(resource)
				.orderBy(ordering)
				.where(predicate)
				.using(manager)
				.executeLocally();
		}


		function save() {
			return manager.saveChanges()
				.then(saveSucceeded, saveFailed);

			function saveSucceeded(result) {
				logSuccess('Saved data', result, true);
			}

			function saveFailed(error) {
				var msg = config.appErrorPrefix + 'Save failed: ' +
					breeze.saveErrorMessageService.getErrorMessage(error);
				error.message = msg;
				logError(msg, error);
				throw error;
			}
		}

		function setupEventForHasChangesChanged() {
			manager.hasChangesChanged.subscribe(function (eventArgs) {
				var data = { hasChanges: eventArgs.hasChanges };
				// send the message (the ctrl receives it)
				common.$broadcast(events.hasChangesChanged, data);
			});
		}


		function _queryFailed(error) {
			var msg = config.appErrorPrefix + 'Error retrieving data.' + error.message;
			logError(msg, error);
			throw error;
		}

	}
})();