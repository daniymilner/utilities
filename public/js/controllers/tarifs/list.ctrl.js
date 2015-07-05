"use strict";

angular
	.module('utilities')
	.controller('tarifsListCtrl', [
		'$state',
		'tarifsFactory',
		'appAlertFactory',
		function($state, Tarifs, appAlert){
			var that = this;

			Tarifs
				.list()
				.then(function(res){
					that.list = res;
				}, appAlert.error);

			this.edit = function(tarif){
				$state.go('tarifsEdit', {id: tarif.id});
			};

			this.remove = function(tarif){
				Tarifs
					.remove(tarif.id)
					.then(function(){
						that.list = that.list.filter(function(item){
							return item.id !== tarif.id;
						});
						appAlert.showSimple({message: 'Tarif successfully removed'})
					}, appAlert.error);
			};

			this.create = function(){
				$state.go('tarifsEdit');
			};

			this.toggle = function(tarif){
				Tarifs
					.toggle(tarif.id)
					.then(function(res){
						that.list = res;
					}, appAlert.error)
			};
		}
	]);