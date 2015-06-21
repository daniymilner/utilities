var passport = require('passport'),
	BearerStrategy = require('passport-http-bearer').Strategy,
	LocalStrategy = require('passport-local').Strategy,
	User = require('../services').User;

module.exports = function(){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User
			.getById(id)
			.then(function(user){
				done(null, user);
			}, function(err){
				done(err);
			});
	});

	passport.use('token', new BearerStrategy({},
		function(token, done){
			User
				.getByToken(token)
				.then(function(user){
					return done(null, user);
				}, function(err){
					err.message = 'Unauthorized';
					err.status = 401;
					return done(err);
				});
		}
	));

	passport.use('login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	}, function(username, password, done){
		User
			.getByUsernamePassword(username, password)
			.then(function(user){
				done(null, user);
			}, function(err){
				err.message = 'Unauthorized';
				err.status = 401;
				done(err);
			});
	}));
};