"use strict";

angular
	.module('utilities')
	.factory('appAlertFactory', [
		'$rootScope',
		function($rootScope){
			var hideDelay = 3000,
				type = 'success';

			this.showSimple = function(params){
				if(params.message){
					params.hideDelay = params.hideDelay || hideDelay;
					params.type = params.type || type;
					$rootScope.$broadcast('showAlert', params);
				}
			};

			this.error = function(params){
				params.type = 'danger';
				this.showSimple(params);
			};

			return this;
		}
	]);