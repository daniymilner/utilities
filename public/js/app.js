"use strict";

angular
	.module('utilities', [
		'ui.router',
		'ui.bootstrap',
		'ngCookies'
	])
	.constant('userSetting', {
		token: '__usr_tt'
	})
	.config([
		'$httpProvider',
		'$stateProvider',
		'$urlRouterProvider',
		'$compileProvider',
		function($httpProvider, $stateProvider, $urlRouterProvider, $compileProvider){
			$httpProvider.interceptors.push('authUserFactory');
			$compileProvider.debugInfoEnabled(false);
			$httpProvider.useApplyAsync(true);

			var userResolver = [
				'currentUserFactory',
				function(currentUser){
					return currentUser.load();
				}
			];

			$stateProvider
				.state('home', {
					url: '/',
					resolve: {user: userResolver},
					views: {
						main: {
							templateUrl: "views/test-view"
						},
						submenu:{
							templateUrl: "views/common/submenu"
						}
					}
				})
				.state('instanceList', {
					url: '/instance-list',
					resolve: {user: userResolver},
					views: {
						main: {
							templateUrl: "views/instance/list"
						},
						submenu:{
							templateUrl: "views/common/submenu"
						}
					}
				})
				.state('instanceEdit', {
					url: '/instance/:id',
					resolve: {user: userResolver},
					views: {
						main: {
							templateUrl: "views/instance/edit"
						},
						submenu:{
							templateUrl: "views/common/submenu"
						}
					}
				})
				.state('login', {
					url: '/login',
					templateUrl: "views/common/login"
				})
				.state('tarifsList', {
					url: '/tarif-list',
					resolve: {user: userResolver},
					views: {
						main: {
							templateUrl: "views/tarifs/list"
						},
						submenu:{
							templateUrl: "views/common/submenu"
						}
					}
				})
				.state('tarifsEdit', {
					url: '/tarif/:id',
					resolve: {user: userResolver},
					views: {
						main: {
							templateUrl: "views/tarifs/edit"
						},
						submenu:{
							templateUrl: "views/common/submenu"
						}
					}
				})
				.state('paymentsEdit', {
					url: '/payments/:id',
					resolve: {user: userResolver},
					views: {
						main: {
							templateUrl: "views/payments/edit"
						},
						submenu:{
							templateUrl: "views/common/submenu"
						}
					}
				});
			$urlRouterProvider.otherwise('/');
		}
	])
	.run([
		'$rootScope',
		'$state',
		'$stateParams',
		'appHistoryFactory',
		function($rootScope, $state, $stateParams, appHistory){
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;

			appHistory.init();
		}
	]);