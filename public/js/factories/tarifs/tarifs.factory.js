"use strict";

angular
	.module('utilities')
	.factory('tarifsFactory', [
		'appUtilsFactory',
		function(appUtils){
			this.list = function(){
				return appUtils.request({
					method: 'get',
					url: '/tarifs/list'
				});
			};
			this.toggle = function(id){
				return appUtils.request({
					method: 'post',
					url: '/tarifs/' + id + '/toggle'
				});
			};
			this.get = function(id){
				return appUtils.request({
					method: 'get',
					url: '/tarifs/' + id
				});
			};
			this.submit = function(item){
				return appUtils.request({
					method: 'put',
					url: '/tarifs',
					data: {
						item: item
					}
				});
			};
			this.remove = function(id){
				return appUtils.request({
					method: 'delete',
					url: '/tarifs/' + id
				});
			};

			return this;
		}
	]);