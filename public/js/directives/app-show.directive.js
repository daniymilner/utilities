"use strict";

angular
	.module('utilities')
	.directive('appShow', [
		function(){
			return {
				restrict: 'A',
				link: function(scope, element){
					var startEvent = scope.$on('$stateChangeSuccess', function(){
						element.attr('style', 'opacity: 1');
						startEvent();
					});
				}
			};
		}]);