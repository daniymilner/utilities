"use strict";

angular
	.module('utilities')
	.controller('instanceEditCtrl', [
		'$state',
		'$stateParams',
		'instanceFactory',
		'appAlertFactory',
		function($state, $stateParams, Instance, appAlert){
			var that = this;

			this.getItem = function(){
				Instance
					.get($stateParams.id)
					.then(function(res){
						that.item = res;
					}, appAlert.error)
			};

			this.submit = function(){
				Instance
					.submit(that.item)
					.then(function(res){
						that.item = res;
						$state.go('instanceList');
						appAlert.showSimple({message: 'Instance successfully saved'})
					}, appAlert.error);
			};

			if ($stateParams.id){
				this.getItem();
			}else{
				this.item = {
					name: '',
					count: 0,
					active: false
				};
				this.isCreate = true;
			}
		}
	]);