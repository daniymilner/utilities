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
					//that.list = res;
					that.list = [{
						id: '123',
						name: 'aaa',
						count: 122
					},{
						id: '312',
						name: 'aaa',
						count: 122,
						active: true
					}];
				}, appAlert.error);

			this.edit = function(instance){
				$state.go('instanceEdit', {id: instance.id});
			};

			this.toggle = function(instance){
				Instance
					.toggle(instance.id)
					.then(function(res){
						instance.status = res.status;
					}, appAlert.error)
			};

			this.create = function(){
				$state.go('instanceEdit');
			};
		}
	]);