"use strict";

angular
	.module('utilities', [
		'ui.router',
		'ui.bootstrap'
	])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){
			$stateProvider
				.state('home', {
					url: '/',
					views: {
						main: {
							templateUrl: "views/test-view"
						}
					}
				})
				.state('aaa', {
					url: '/aaa',
					views: {
						main: {
							templateUrl: "views/test-view"
						}
					}
				});
			$urlRouterProvider.otherwise('/');
		}
	])
	.run([function(){
	}]);