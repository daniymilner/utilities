var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	userFilter = passport.authenticate('token'),
	loginFilter = passport.authenticate('login'),
	controllers = require('../controllers');

router
	.get('/', function(req, res){
		res.render('index');
	})
	.get('/views/*', function(req, res){
		var path = req.url.replace(/^\/views\//, '');
		res.render(path);
	})
	.get('/user/:userId', userFilter, controllers.user.get)
	.post('/user', userFilter, controllers.user.login);

module.exports = router;
