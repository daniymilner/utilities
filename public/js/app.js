"use strict";

angular
	.module('utilities', [
		'ui.router',
		'ui.bootstrap',
		'ngCookies'
	])
	.constant('userSetting', {
		token: '__usr_t'
	})
	.config([
		'$httpProvider',
		'$stateProvider',
		'$urlRouterProvider',
		function($httpProvider, $stateProvider, $urlRouterProvider){
			var userResolver = [
				'currentUserFactory',
				function(currentUser){
					return currentUser.load();
				}
			];

			$httpProvider.interceptors.push('authUserFactory');

			$stateProvider
				.state('home', {
					url: '/',
					resolve: {user: userResolver},
					views: {
						main: {
							templateUrl: "views/test-view"
						}
					}
				})
				.state('login', {
					url: '/login',
					templateUrl: "views/common/login"
				});
			$urlRouterProvider.otherwise('/');
		}
	])
	.run([function(){
	}]);