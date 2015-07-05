"use strict";

angular
	.module('utilities')
	.controller('paymentsEditCtrl', [
		'$state',
		'$q',
		'$stateParams',
		'paymentsFactory',
		'instanceFactory',
		'tarifsFactory',
		'appAlertFactory',
		function($state, $q, $stateParams, Payments, Instance, Tarifs, appAlert){
			var that = this;

			this.getItem = function(){
				//Instance
				//	.get($stateParams.id)
				//	.then(function(res){
				//		that.item = res;
				//	}, appAlert.error)
			};

			this.submit = function(){
				//Instance
				//	.submit(that.item)
				//	.then(function(res){
				//		that.item = res;
				//		$state.go('instanceList');
				//		appAlert.showSimple({message: 'Instance successfully saved'})
				//	}, appAlert.error);
			};

			this.changeInstance = function(){
				getCurrectTariff();
			};

			Instance
				.list()
				.then(function(instanceList){
					that.instanceList = instanceList;

					Tarifs
						.list()
						.then(function(tarifsList){
							that.tarifsList = tarifsList;

							if($stateParams.id){
								that.getItem();
							}else{
								that.instance = that.instanceList[0];
								getCurrectTariff();
								that.item = {};
								that.isCreate = true;
							}

						});
				});

			function getCurrectTariff(){
				that.currentTarifsList = that.tarifsList
					.filter(function(tarif){
						return tarif.instance.id === that.instance.id && tarif.active;
					});
				that.tariff = that.currentTarifsList.length ? that.currentTarifsList[0] : null;
			}

		}
	]);