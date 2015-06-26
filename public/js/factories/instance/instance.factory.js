"use strict";

angular
	.module('utilities')
	.factory('instanceFactory', [
		'appUtilsFactory',
		function(appUtils){
			this.list = function(){
				return appUtils.request({
					method: 'get',
					url: '/instance/list'
				});
			};
			this.toggle = function(id){
				return appUtils.request({
					method: 'post',
					url: '/instance/' + id + '/toggle'
				});
			};
			this.get = function(id){
				return appUtils.request({
					method: 'get',
					url: '/instance/' + id
				});
			};

			return this;
		}
	]);