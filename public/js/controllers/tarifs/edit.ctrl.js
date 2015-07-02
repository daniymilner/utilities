"use strict";

angular
	.module('utilities')
	.controller('tarifsEditCtrl', [
		'$q',
		'$state',
		'$stateParams',
		'tarifsFactory',
		'appAlertFactory',
		'instanceFactory',
		function($q, $state, $stateParams, Tarifs, appAlert, Instance){
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

			function getInstances(){
				var deferrer = $q.defer();
				Instance
					.list()
					.then(function(list){
						that.instanceList = list;
						deferrer.resolve();
					}, deferrer.reject);

				return deferrer.promise;
			}

			this.getItem = function(){
				Tarifs
					.get($stateParams.id)
					.then(function(res){
						that.item = res;
						that.item.type = that.types.filter(function(type){
							return type.type === that.item.type;
						})[0];
						that.item.instance = that.instanceList.filter(function(instance){
							return instance.id === that.item.instance;
						})[0];
						initDefaultPeriod();
					}, appAlert.error)
			};

			this.submit = function(){
				Tarifs
					.submit(that.item)
					.then(function(){
						$state.go('tarifsList');
						appAlert.showSimple({message: 'Tarif successfully saved'})
					}, appAlert.error);
			};

			function initDefaultPeriod(){
				that.period = {
					start: new Date(),
					stop: new Date(),
					cost: 0
				};
				that.dateOptions = {
					formatYear: 'yy',
					startingDay: 1
				};
			}

			this.changeType = function(){
				that.item.period = [];
				initDefaultPeriod();
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

			this.removePeriod = function(index){
				that.item.period.splice(index, 1);
			};

			getInstances()
				.then(function(){
					if ($stateParams.id){
						that.getItem();
					}else{
						that.item = {
							cost: 0,
							type: that.types[0],
							instance: that.instanceList[0]
						};
						that.isCreate = true;
					}
				});

		}
	]);