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
	.post('/user', controllers.user.login)
	.post('/user/login', loginFilter, controllers.user.login)
	.post('/user/logout', userFilter, function(req, res){
		req.logout();
		res.status(200).end();
	})

	.get('/instance/list', userFilter, controllers.instance.list)
	.get('/instance/:id', userFilter, controllers.instance.get)
	.post('/instance/:id/toggle', userFilter, controllers.instance.toggle)
	.put('/instance', userFilter, controllers.instance.submit)
	.delete('/instance/:id', userFilter, controllers.instance.remove)

	.get('/tarifs/list', userFilter, controllers.tarifs.list)
	.get('/tarifs/:id', userFilter, controllers.tarifs.get)
	.post('/tarifs/:id/toggle', userFilter, controllers.tarifs.toggle)
	.put('/tarifs', userFilter, controllers.tarifs.submit)
	.delete('/tarifs/:id', userFilter, controllers.tarifs.remove);

module.exports = router;
