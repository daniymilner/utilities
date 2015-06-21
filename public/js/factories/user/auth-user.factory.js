"use strict";

angular
	.module('utilities')
	.factory('authUserFactory', [
		'$injector',
		'$cookies',
		'userSetting',
		function($injector, $cookies, userSetting){
			return {
				request: function(req){
					var currentUser = $injector.get('currentUserFactory'),
						token;

					if(currentUser.user && currentUser.user.access_token){
						token = currentUser.user.access_token;
					}else if($cookies[userSetting.token]){
						token = $cookies[userSetting.token];
					}

					if(token){
						req.headers.Authorization = 'Bearer ' + token;
					}

					return req;
				}
			};
		}
	]);