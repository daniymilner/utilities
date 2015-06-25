var Instance = require('../../services').Instance;

module.exports = function(req, res, next){
	Instance
		.list()
		.then(function(list){
			res.json(list);
		}, function(err){
			next(err);
		});
};