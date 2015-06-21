"use strict";

angular
	.module('utilities')
	.factory('currentUserFactory', [
		'$q',
		'$state',
		'$cookies',
		'userFactory',
		'appUtilsFactory',
		'userSetting',
		function($q, $state, $cookies, User, appUtilsFactory, userSetting){
			var that = this,
				onError = function(){
					delete that.user;
					delete $cookies['express.sid'];
					delete $cookies[userSetting.token];
					$state.go('login');
				};

			this.load = function(){
				var deferred = $q.defer();
				User
					.get()
					.then(function(user){
						that.user = user;
						$cookies[userSetting.token] = user.access_token;
						deferred.resolve(user);
					}, function(err){
						deferred.reject(err);
						onError();
					});
				return deferred.promise;
			};

			this.login = function(user){
				var deferred = $q.defer();
				appUtilsFactory
					.request({
						method: 'post',
						url: '/user/login',
						data: user
					})
					.then(function(user){
						that.user = user;
						$cookies[userSetting.token] = user.access_token;
						deferred.resolve(user);
					}, function(err){
						deferred.reject(err);
						onError();
					});
				return deferred.promise;
			};

			this.logout = function(){
				var deferred = $q.defer();
				appUtilsFactory
					.request({
						method: 'post',
						url: '/user/logout'
					})
					.then(function(){
						delete that.user;
						delete $cookies['express.sid'];
						delete $cookies[userSetting.token];
						deferred.resolve();
					}, deferred.reject);
				return deferred.promise;
			};

			return this;
		}
	]);