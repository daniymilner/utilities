"use strict";

angular
	.module('utilities')
	.controller('instanceListCtrl', [
		'$state',
		'instanceFactory',
		'appAlertFactory',
		function($state, Instance, appAlert){
			var that = this;

			Instance
				.list()
				.then(function(res){
					that.list = res;
				}, appAlert.error);

			this.edit = function(instance){
				$state.go('instanceEdit', {id: instance.id});
			};

			this.toggle = function(instance){
				Instance
					.toggle(instance.id)
					.then(function(res){
						var item = that.list.filter(function(item){
							return item.id === res.id;
						})[0];
						item.active = res.active;
					}, appAlert.error)
			};

			this.remove = function(instance){
				Instance
					.remove(instance.id)
					.then(function(){
						that.list = that.list.filter(function(item){
							return item.id !== instance.id;
						});
						appAlert.showSimple({message: 'Instance successfully removed'})
					}, appAlert.error);
			};

			this.create = function(){
				$state.go('instanceEdit');
			};
		}
	]);