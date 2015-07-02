var Tarifs = require('../../services').Tarifs;

module.exports = function(req, res, next){
	var id = req.params.id;

	Tarifs
		.get(id)
		.then(function(item){
			res.json(item);
		}, next);
};