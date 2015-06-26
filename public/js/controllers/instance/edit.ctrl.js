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

			if ($stateParams.id){
				this.getItem();
			}else{
				this.item = {};
				this.isCreate = true;
			}
		}
	]);