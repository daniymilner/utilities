var Tarifs = require('../../services').Tarifs;

module.exports = function(req, res, next){
	var item = req.body.item;

	if(item){
		if (item.id){
			Tarifs
				.update(item)
				.then(function(tariff){
					res.json(tariff);
				}, next);
		}else{
			Tarifs
				.create(item)
				.then(function(tariff){
					res.json(tariff);
				}, next);
		}
	}else{
		next(new Error('No item to create'));
	}
};