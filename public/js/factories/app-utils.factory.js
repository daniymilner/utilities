"use strict";

angular
	.module('utilities')
	.factory('appUtilsFactory', [
		'$http',
		'$q',
		function($http, $q){
			this.request = function(params){
				var deferred = $q.defer();
				$http[params.method](params.url, params.data)
					.success(function(data){
						deferred.resolve(data);
					})
					.error(function(data){
						deferred.reject(data);
					});
				return deferred.promise;
			};

			this.isEmptyObject = function(obj){
				return angular.equals({}, obj);
			};

			this.getHash = function (){
				return Math.random().toString(36).substr(2, 9);
			};

			return this;
		}
	]);