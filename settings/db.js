var mongoose = require('mongoose'), db,
	env = require('../modules').config.getEnv();

mongoose.connect('mongodb://' + env.db.host + '/' + env.db.db);
mongoose.set('debug', env.db.debug || false);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
	console.log('Database:', env.db.db);
});