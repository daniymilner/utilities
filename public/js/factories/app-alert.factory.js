"use strict";

angular
	.module('utilities')
	.factory('appAlertFactory', [
		'$rootScope',
		function($rootScope){
			var that = this,
				hideDelay = 5000,
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
				that.showSimple(params);
			};

			return this;
		}
	]);