"use strict";

angular
	.module('utilities')
	.factory('userFactory', [
		'appUtilsFactory',
		function(appUtils){
			this.get = function(){
				return appUtils.request({
					method: 'post',
					url: '/user'
				});
			};
			this.getById = function(id){
				return appUtils.request({
					method: 'get',
					url: '/user/' + id
				});
			};

			return this;
		}
	]);