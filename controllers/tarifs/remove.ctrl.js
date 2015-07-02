var Tarifs = require('../../services').Tarifs;

module.exports = function(req, res, next){
	Tarifs
		.remove(req.params.id)
		.then(function(){
			res.send(200);
		}, next);
};