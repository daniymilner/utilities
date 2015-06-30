"use strict";

angular
	.module('utilities')
	.controller('tarifsEditCtrl', [
		'$state',
		'$stateParams',
		'tarifsFactory',
		'appAlertFactory',
		function($state, $stateParams, Tarifs, appAlert){
			var that = this;

			this.types = [{
				type: 'static',
				name: 'Static'
			}, {
				type: 'full',
				name: 'Full'
			}, {
				type: 'period',
				name: 'Period'
			}];

			this.getItem = function(){
				Tarifs
					.get($stateParams.id)
					.then(function(res){
						that.item = res;
					}, appAlert.error)
			};

			this.submit = function(){
				//Tarifs
				//	.submit(that.item)
				//	.then(function(res){
				//		that.item = res;
				//		$state.go('tarifsList');
				//		appAlert.showSimple({message: 'Tarif successfully saved'})
				//	}, appAlert.error);
			};

			function initDefaultPeriod(){
				that.period = {
					start: new Date(),
					stop: new Date(),
					cost: 0
				};
			}

			this.changeType = function(){
				that.item.period = [];
				initDefaultPeriod();
				that.dateOptions = {
					formatYear: 'yy',
					startingDay: 1
				};
			};

			this.openStartDate = function($event){
				$event.preventDefault();
				$event.stopPropagation();

				this.openedStartDate = true;
			};

			this.openStopDate = function($event){
				$event.preventDefault();
				$event.stopPropagation();

				this.openedStopDate = true;
			};

			this.addPeriod = function(){
				that.item.period.push(angular.copy(that.period));
				initDefaultPeriod();
			};

			if ($stateParams.id){
				this.getItem();
			}else{
				that.item = {
					cost: 0,
					type: that.types[0]
				};
				this.isCreate = true;
			}
		}
	]);