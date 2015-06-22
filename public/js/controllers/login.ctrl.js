"use strict";

angular
	.module('utilities')
	.controller('loginCtrl', [
		'$state',
		'currentUserFactory',
		'appAlertFactory',
		'appHistoryFactory',
		function($state, currentUser, appAlert, appHistory){
			var that = this;

			this.user = {
				username: '',
				password: ''
			};

			this.login = function(){
				currentUser
					.login(that.user)
					.then(function(){
						var prevUrl = appHistory.getPrevUrl();
						if(prevUrl){
							window.location.hash = appHistory.getPrevUrl();
						}else{
							$state.go('gallery');
						}
					}, function(){
						appAlert.error({message: 'Login failed'});
					});
			};
		}
	]);