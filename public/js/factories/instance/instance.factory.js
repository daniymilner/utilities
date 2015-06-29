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
			this.submit = function(item){
				return appUtils.request({
					method: 'put',
					url: '/instance',
					data: {
						item: item
					}
				});
			};
			this.remove = function(id){
				return appUtils.request({
					method: 'delete',
					url: '/instance/' + id
				});
			};

			return this;
		}
	]);