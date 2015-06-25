var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	modules = require('../modules'),
	env = modules.config.getEnv(),
	passport = require('passport'),
	expressSession = require('express-session'),
	cors = require('cors'),
	methodOverride = require('method-override');

module.exports = function(app){
	var MongoStore = require('connect-mongo')(expressSession),
		store = new MongoStore(env.db),
		sessionMiddleware = expressSession({
			secret: env.secret,
			key: env.key,
			store: store,
			resave: false,
			saveUninitialized: true
		});
	app.set('port', env.port);
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');
	app.set('modules', modules);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(sessionMiddleware);
	app.use(modules.stylus(path.join(__dirname, '../public')));
	app.use(express.static(path.join(__dirname, '../public')));
	app.use(cors());
	app.use(logger('dev'));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(function(req, res, next){
		req.hostname = req.protocol + '://' + req.get('host');
		next();
	});

	require('./db');

	app.use('/', require('../routes'));

	require('./passport')();

	/*Error handling*/
	app.use(function(err, req, res, next){
		console.log(err);
		res
			.status(err.status || 500)
			.json({
				message: err.message,
				err: err,
				stack: err.stack
			});
	});
};