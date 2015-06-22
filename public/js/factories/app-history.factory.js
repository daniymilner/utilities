"use strict";

angular
	.module('utilities')
	.factory('appHistoryFactory', [
		'$state',
		'$rootScope',
		function($state, $rootScope){
			var history = [];

			this.init = function(){
				$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
					var url = $state.href(toState, toParams);
					if(url && history[history.length - 1] !== url){
						history.push(url);
					}
				});
			};

			this.getPrevUrl = function(){
				var prevUrl = history[history.length - 2];
				if(prevUrl){
					return prevUrl;
				}
			};

			this.clearHistory = function(){
				history = [];
			};

			return this;
		}
	]);