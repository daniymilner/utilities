"use strict";

angular
	.module('utilities')
	.controller('alertCtrl', [
		'$scope',
		'$timeout',
		function($scope, $timeout){
			var that = this,
				timeout;

			$scope.$on('showAlert', function(event, data){
				that.alert = data;
				that.showAlert = true;
				$timeout.cancel(timeout);
				timeout = $timeout(function(){
					that.showAlert = false;
				}, data.hideDelay);
			});
		}
	]);