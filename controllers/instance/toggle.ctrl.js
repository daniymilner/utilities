var Instance = require('../../services').Instance;

module.exports = function(req, res, next){
	Instance
		.toggle(req.params.id)
		.then(function(instance){
			res.json(instance);
		}, next);
};