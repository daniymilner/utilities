var Tarifs = require('../../services').Tarifs;

module.exports = function(req, res, next){
	Tarifs
		.list()
		.then(function(list){
			res.json(list);
		}, next);
};