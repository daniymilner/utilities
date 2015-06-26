var Instance = require('../../services').Instance;

module.exports = function(req, res, next){
	var id = req.params.id;

	Instance
		.get(id)
		.then(function(item){
			res.json(item);
		}, next);
};