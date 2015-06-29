"use strict";

angular
	.module('utilities')
	.controller('tarifsEditCtrl', [
		'$state',
		'$stateParams',
		'tarifsFactory',
		'appAlertFactory',
		function($state, $stateParams, Tarifs, appAlert){
			//todo
			var that = this;

			this.item = {
				name: '',
				count: 0,
				active: false
			};

			this.getItem = function(){
				Tarifs
					.get($stateParams.id)
					.then(function(res){
						that.item = res;
					}, appAlert.error)
			};

			this.submit = function(){
				Tarifs
					.submit(that.item)
					.then(function(res){
						that.item = res;
						$state.go('tarifsList');
						appAlert.showSimple({message: 'Tarif successfully saved'})
					}, appAlert.error);
			};

			if ($stateParams.id){
				this.getItem();
			}else{
				this.item = {};
				this.isCreate = true;
			}
		}
	]);