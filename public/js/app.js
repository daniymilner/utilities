"use strict";

angular
	.module('utilities', [
		'ui.router',
		'ui.bootstrap'
	])
	.config([
		'$httpProvider',
		'$stateProvider',
		'$urlRouterProvider',
		function($httpProvider, $stateProvider, $urlRouterProvider){
			$stateProvider
				.state('home', {
					url: '/',
					views: {
						main: {
							templateUrl: "views/common/test-view"
						}
					}
				})
				.state('aaa', {
					url: '/aaa',
					views: {
						main: {
							templateUrl: "views/common/test-view"
						}
					}
				});
			$urlRouterProvider.otherwise('/');
		}
	])
	.run([function(){
	}]);