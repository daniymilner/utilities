"use strict";

angular
	.module('utilities')
	.controller('menuCtrl', [
		'$state',
		'currentUserFactory',
		'appAlertFactory',
		'appHistoryFactory',
		function($state, currentUser, appAlert, appHistory){
			this.logout = function(){
				currentUser
					.logout()
					.then(function(){
						appHistory.clearHistory();
						$state.go('login');
					}, appAlert.error);
			};
		}
	]);